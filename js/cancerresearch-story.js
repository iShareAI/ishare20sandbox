const campaignStories = {
  centre: `
    <span class="story-kicker">Lead Campaign Priority</span>
    <h3>The Precision Oncology Centre</h3>
    <p>Transforming Cancer Care. Personalizing Every Treatment. Saving More Lives.</p>
    <p>Cancer is not one disease. It is thousands. And yet for generations, treatment followed a one-size-fits-all approach. That era is over.</p>
    <p>The Precision Oncology Centre represents a fundamental shift in how we fight cancer — moving from broad, generalized treatment to hyper-targeted therapies guided by each patient’s unique genetic and molecular profile. Every diagnosis is analyzed at the cellular level. Every treatment plan is engineered for the individual. Every outcome is informed by the most advanced science in the world.</p>
    <ul>
      <li>Genomic sequencing and molecular profiling capabilities</li>
      <li>A dedicated multidisciplinary tumour board</li>
      <li>AI-powered treatment planning tools and clinical trial matching</li>
      <li>State-of-the-art infusion and treatment suites</li>
      <li>Research infrastructure to accelerate breakthrough discoveries</li>
    </ul>
  `,
  welcome: `
    <span class="story-kicker">Campaign Priority</span>
    <h3>Welcome Area</h3>
    <p>A $5,000,000 naming opportunity. The first step in every patient’s journey begins here.</p>
    <p>The Welcome Centre is where fear begins to give way to hope. It is the first face a patient sees, the first voice that says “we’ve got you,” and the first space that communicates — without a word — that this place was built for them.</p>
  `,
  waiting: `
    <span class="story-kicker">Campaign Priority</span>
    <h3>Patient Waiting Area</h3>
    <p>A $2,500,000 naming opportunity. Not a waiting room. A healing environment.</p>
    <p>The Patient Waiting Area is a carefully considered, therapeutically designed space built around the emotional and psychological needs of cancer patients and their families.</p>
    <ul>
      <li>Natural light, biophilic design, and warm restorative materials</li>
      <li>Flexible seating for privacy, connection, and family support</li>
      <li>Quiet reflection spaces and refreshment amenities</li>
      <li>Child-friendly zones and practical comforts like Wi-Fi and charging</li>
    </ul>
  `,
  reception: `
    <span class="story-kicker">Campaign Priority</span>
    <h3>Reception Desk</h3>
    <p>A $1,000,000 naming opportunity. The first face. The first voice. The first moment of hope.</p>
    <p>The Reception Desk is the command centre of the patient experience — where confusion becomes clarity, fear begins to soften, and every patient starts their journey with dignity and reassurance.</p>
  `,
  recovery: `
    <span class="story-kicker">Campaign Priority</span>
    <h3>Patient Recovery Area</h3>
    <p>A $500,000 naming opportunity. Where treatment ends. Where strength returns. Where the journey home begins.</p>
    <p>The Patient Recovery Area is a calm, restorative, expertly staffed environment where patients are monitored, supported, nourished, and cared for until they are truly ready to go home.</p>
  `,
  exam: `
    <span class="story-kicker">Campaign Priority</span>
    <h3>Clinical Examination Room</h3>
    <p>One of eight. A $250,000 naming opportunity.</p>
    <p>This is where the most important conversations in medicine happen — where diagnoses are delivered with compassion, treatment plans are explained clearly, and patients become active participants in their care.</p>
    <ul>
      <li>Private consultation space with dignity and acoustic privacy</li>
      <li>Diagnostic displays for imaging, genomic data, and treatment pathways</li>
      <li>Family seating and integrated telehealth capability</li>
      <li>Patient education resources at the point of care</li>
    </ul>
  `
};

document.addEventListener("DOMContentLoaded", () => {
  const rows = document.querySelectorAll(".naming-table tbody tr[data-story]");
  const panel = document.getElementById("story-panel");

  if (!rows.length || !panel) return;

  panel.classList.add("is-empty");

  rows.forEach((row) => {
    row.addEventListener("click", () => {
      rows.forEach((r) => r.classList.remove("active"));
      row.classList.add("active");

      const key = row.dataset.story;
      panel.innerHTML = campaignStories[key] || "";
      panel.classList.remove("is-empty");

      panel.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  });
});