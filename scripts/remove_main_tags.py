import os
import re

files = [
    'src/app/methodology/page.tsx',
    'src/app/areas/hines/page.tsx',
    'src/app/areas/albany/page.tsx',
    'src/app/areas/salem/page.tsx',
    'src/app/areas/drewsey/page.tsx',
    'src/app/areas/burns/page.tsx',
    'src/app/areas/corvallis/page.tsx',
    'src/app/tools/cost-estimator/page.tsx',
    'src/app/tools/cost-calculator/page.tsx',
    'src/app/about/page.tsx',
    'src/app/page.tsx',
    'src/app/compare/kaufmans-home-maintenance/page.tsx',
    'src/app/compare/homesmiles/page.tsx',
    'src/app/emergency/page.tsx',
    'src/app/services/tenant-services/page.tsx',
    'src/app/services/mold-remediation/page.tsx',
    'src/app/services/windows-doors/page.tsx',
    'src/app/services/sitework/page.tsx',
    'src/app/services/roof-maintenance/page.tsx',
    'src/app/services/demolition/page.tsx',
    'src/app/services/kitchen-remodeling/page.tsx',
    'src/app/services/water-damage/page.tsx',
    'src/app/services/maintenance-subscriptions/page.tsx'
]

base_dir = '/srv/new/benson-home-solutions-web/'

for file_path in files:
    full_path = os.path.join(base_dir, file_path)
    if not os.path.exists(full_path):
        print(f"File not found: {full_path}")
        continue
    
    with open(full_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Replace <main> with <> and </main> with </>
    # We want to be careful to only replace the ones that are likely the root wrapper.
    # Usually it's <main> and </main> at the same indentation level.
    
    # Pattern to match <main> and </main>
    # Simple replacement if they exist
    new_content = content.replace('<main>', '<>').replace('</main>', '</>')
    
    if new_content != content:
        with open(full_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated: {file_path}")
    else:
        print(f"No <main> tags found in: {file_path}")
