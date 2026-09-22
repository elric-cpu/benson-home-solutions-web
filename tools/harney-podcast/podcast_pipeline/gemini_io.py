from __future__ import annotations
import base64, wave
from pathlib import Path
from .config import *

def client():
    try: from google import genai
    except ImportError as e: raise PipelineError("google-genai missing; pip install -r requirements.txt") from e
    if os.getenv("GOOGLE_GENAI_USE_VERTEXAI","").lower() in {"1","true","yes"}:
        project=os.getenv("GOOGLE_CLOUD_PROJECT"); loc=os.getenv("GOOGLE_CLOUD_LOCATION","global")
        if not project: raise PipelineError("GOOGLE_CLOUD_PROJECT required for Vertex/ADC")
        return genai.Client(vertexai=True,project=project,location=loc)
    if not (os.getenv("GEMINI_API_KEY") or os.getenv("GOOGLE_API_KEY")): raise PipelineError("No Gemini credentials; prefer Vertex/ADC, API key allowed for development")
    return genai.Client()
def tts_pcm(c,text,model=TTS_MODEL):
    from google.genai import types
    r=c.models.generate_content(model=model,contents=text,config=types.GenerateContentConfig(response_modalities=["AUDIO"],speech_config=types.SpeechConfig(multi_speaker_voice_config=types.MultiSpeakerVoiceConfig(speaker_voice_configs=[types.SpeakerVoiceConfig(speaker="HOST_A",voice_config=types.VoiceConfig(prebuilt_voice_config=types.PrebuiltVoiceConfig(voice_name=VOICE_A))),types.SpeakerVoiceConfig(speaker="HOST_B",voice_config=types.VoiceConfig(prebuilt_voice_config=types.PrebuiltVoiceConfig(voice_name=VOICE_B)))]))))
    try: d=r.candidates[0].content.parts[0].inline_data.data
    except Exception as e: raise PipelineError(f"{model} returned no inline audio") from e
    return base64.b64decode(d) if isinstance(d,str) else bytes(d)
def tts_pcm_failover(c,text):
    errors=[]
    for model in (TTS_MODEL,TTS_FALLBACK):
        try: return tts_pcm(c,text,model),model
        except Exception as e: errors.append(f"{model}: {e}")
    raise PipelineError("TTS primary+fallback failed: "+" | ".join(errors))

def write_wav(path:Path,pcm:bytes):
    path.parent.mkdir(parents=True,exist_ok=True)
    with wave.open(str(path),"wb") as w: w.setnchannels(1); w.setsampwidth(2); w.setframerate(RATE); w.writeframes(pcm)
def render_chunks(c,chunks,out,ep):
    out.mkdir(parents=True,exist_ok=True); files=[]
    for i,x in enumerate(chunks,1):
        dst=out/f"{ep}_chunk_{i}.wav"
        pcm,_=tts_pcm_failover(c,x)
        if len(pcm)<4800: raise PipelineError("TTS audio unexpectedly short")
        write_wav(dst,pcm); files.append(dst)
    return files
def annotations(response):
    out=[]
    for cand in getattr(response,"candidates",[]) or []:
        for part in getattr(getattr(cand,"content",None),"parts",[]) or []:
            tr=getattr(part,"audio_transcription",None)
            if tr:
                sp=getattr(tr,"speaker_label","") or ""
                for w in getattr(tr,"words",[]) or []: out.append({"word":getattr(w,"word","") or "","speaker":sp,"start":str(getattr(w,"start_offset","") or ""),"end":str(getattr(w,"end_offset","") or "")})
    return out
def transcribe(c,path:Path):
    from google.genai import types
    f=c.files.upload(file=str(path))
    try:
        r=c.models.generate_content(model=ASR_MODEL,contents=[f],config=types.GenerateContentConfig(audio_transcription_config=types.AudioTranscriptionConfig(language_codes=["en-US"],diarization=True,word_timestamp=True)))
        return r.text or "",annotations(r)
    finally:
        try: c.files.delete(name=f.name)
        except Exception: pass
