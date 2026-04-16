import os
import glob
import re

dir_path = r'c:\Users\user\.gemini\antigravity\scratch\Branding-Whizz-website\bw'
files = glob.glob(os.path.join(dir_path, '*.html'))

new_nav = """<nav class="nav-links">
                <a href="index.html">Home</a>
                <a href="about.html">About</a>
                <div class="nav-link-wrapper">
                    <a href="who-we-are.html">Who We Are <i class="fa-solid fa-chevron-down"></i></a>
                    <ul class="dropdown-menu">
                        <li><a href="who-we-are.html#mandate">Our Mandate</a></li>
                        <li><a href="who-we-are.html#vision">Vision, Mission & Values</a></li>
                        <li><a href="who-we-are.html#leadership">Leadership Team</a></li>
                    </ul>
                </div>
                <div class="nav-link-wrapper">
                    <a href="services.html">Services <i class="fa-solid fa-chevron-down"></i></a>
                    <ul class="dropdown-menu">
                        <li><a href="ecosystem.html#ecosystem">Creative Design (Khudu)</a></li>
                        <li><a href="ecosystem.html#ecosystem">Marketing (Lengau)</a></li>
                        <li><a href="ecosystem.html#ecosystem">Printing (Phuti)</a></li>
                        <li><a href="ecosystem.html#ecosystem">Digital Media (Tshephe)</a></li>
                        <li><a href="ecosystem.html#ecosystem">Communications (Noko)</a></li>
                    </ul>
                </div>
                <a href="projects.html">Projects</a>
                <div class="nav-link-wrapper">
                    <a href="opportunities.html">Opportunities <i class="fa-solid fa-chevron-down"></i></a>
                    <ul class="dropdown-menu">
                        <li><a href="opportunities.html#careers">Careers</a></li>
                        <li><a href="opportunities.html#tenders">Tender Notices</a></li>
                        <li><a href="opportunities.html#suppliers">Supplier Registration</a></li>
                    </ul>
                </div>
                <a href="contact.html">Contact</a>
                <a href="ecosystem.html">Ecosystem</a>
            </nav>"""

pattern = re.compile(r'<nav class="nav-links">.*?</nav>', re.DOTALL)

for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    new_content = pattern.sub(new_nav, content)
    
    with open(file, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print(f"Updated {file}")
