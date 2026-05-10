import re

pyramid_html = """            <!-- Pyramid Hierarchy -->
            <div class="exco-pyramid">

                <!-- Tier 1: CEO -->
                <div class="pyramid-tier tier-1">
                    <div class="tier-label">
                        <span class="tier-num">1</span>
                        <i class="fa-solid fa-crown"></i>
                        <span class="tier-title">CEO</span>
                    </div>
                    <div class="tier-desc">
                        <strong>Chief Executive Officer</strong>
                        <p>Serves as the overall head of Branding Whizz (Pty) Ltd, responsible for the strategic direction and success of the entire organization.</p>
                    </div>
                </div>

                <!-- Tier 2: COO -->
                <div class="pyramid-tier tier-2">
                    <div class="tier-label">
                        <span class="tier-num">2</span>
                        <i class="fa-solid fa-gears"></i>
                        <span class="tier-title">COO</span>
                    </div>
                    <div class="tier-desc">
                        <strong>Chief Operations Officer</strong>
                        <p>Responsible for the day-to-day operational management, ensuring all departments execute their functions efficiently and effectively.</p>
                        <div class="tier-subroles">
                            <span><i class="fa-solid fa-user-tie"></i> <strong>HR Officer:</strong> Manages human capital, ensuring a productive, compliant, ethical, and supportive working environment.</span>
                            <span><i class="fa-solid fa-file-signature"></i> <strong>Permanent Secretary:</strong> Provides high-level administrative, coordination, and secretarial support to ensure the smooth functioning of the Office of the COO.</span>
                        </div>
                    </div>
                </div>

                <!-- Tier 3: CFO -->
                <div class="pyramid-tier tier-3">
                    <div class="tier-label">
                        <span class="tier-num">3</span>
                        <i class="fa-solid fa-chart-pie"></i>
                        <span class="tier-title">CFO</span>
                    </div>
                    <div class="tier-desc">
                        <strong>Chief Financial Officer</strong>
                        <p>Responsible for the financial health, sustainability, and accountability of the organization.</p>
                    </div>
                </div>

                <!-- Tier 4: CMO -->
                <div class="pyramid-tier tier-4">
                    <div class="tier-label">
                        <span class="tier-num">4</span>
                        <i class="fa-solid fa-bullseye"></i>
                        <span class="tier-title">CMO</span>
                    </div>
                    <div class="tier-desc">
                        <strong>Chief Marketing Officer</strong>
                        <p>Responsible for branding, market positioning, and revenue generation through marketing and strategic partnerships.</p>
                    </div>
                </div>

                <!-- Tier 5: CTO -->
                <div class="pyramid-tier tier-5">
                    <div class="tier-label">
                        <span class="tier-num">5</span>
                        <i class="fa-solid fa-microchip"></i>
                        <span class="tier-title">CTO</span>
                    </div>
                    <div class="tier-desc">
                        <strong>Chief Technology Officer</strong>
                        <p>Responsible for the technological infrastructure and innovation, including the development and maintenance of the Educational Institutional Search Portal (EIS) platform.</p>
                    </div>
                </div>

            </div><!-- end pyramid -->
"""

with open("ecosystem.html", "r", encoding="utf-8") as f:
    content = f.read()

# Replace the bad single-line pyramid block
pattern = r'            <!-- Pyramid Hierarchy -->\\n.*?<!-- end pyramid -->'
replacement = pyramid_html.rstrip()
new_content = re.sub(pattern, replacement, content, flags=re.DOTALL)

with open("ecosystem.html", "w", encoding="utf-8") as f:
    f.write(new_content)

print("Done - pyramid HTML fixed successfully.")
