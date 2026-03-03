# PRD: Benson Operations Chatbot & RAG Update

## Overview
Update the Pinecone vector database with the full "Benson Home Solutions Operations Manual" from Notion and build a RAG-powered chatbot for the website. The chatbot will serve as an internal and external knowledge assistant, answering questions about company SOPs, services, and policies.

## Target Stack
- **Vector DB:** Pinecone (knowledge namespace)
- **Embeddings:** Google GenAI (text-embedding-004)
- **LLM:** Google Gemini 1.5 Flash (via `/api/chat`)
- **Frontend:** React Chat Component
- **Source:** Notion API (Operations Manual Page)

## Features & Requirements
### 1. RAG Data Update (High Priority)
- [ ] Create a script to recursively crawl the Notion Operations Manual page.
- [ ] Extract block-level content (text, lists, headings).
- [ ] Upsert data into Pinecone `knowledge` namespace with proper metadata (title, category, url).

### 2. Chatbot API (`/api/chat`)
- [ ] Implement a POST endpoint for chat.
- [ ] Retrieve relevant context from Pinecone based on user query.
- [ ] Construct a system prompt that enforces the "Elric Benson" tone (confident, direct, professional).
- [ ] Use Gemini 1.5 Flash to generate responses using retrieved context.

### 3. Frontend Chat Component
- [ ] Build a floating "Ask Benson" chat widget.
- [ ] Support streaming responses (optional but preferred).
- [ ] Show source links/citations for answers.
- [ ] Clean, branded design (Maroon/Cream).

### 4. Admin/Internal Access (Optional Phase)
- [ ] Restrict certain SOP data to authenticated users if necessary.

## Acceptance Criteria
- Seeding script successfully processes the full Notion page and sub-pages.
- Chatbot correctly answers "What is Benson's water damage restoration process?" using manual data.
- Response tone matches Elric's voice profile.
- Citations point back to the Notion page or website methodology pages.
- Performance: Response generated in < 3s.
