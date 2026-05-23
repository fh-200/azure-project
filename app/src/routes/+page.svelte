<svelte:head>
  <title>Freeman Hubbard — Resume</title>
  <meta
    name="description"
    content="Resume of Freeman Hubbard, AZ-104-certified Azure and Microsoft 365 administrator specializing in Entra ID, Intune, PowerShell automation, and Microsoft Graph-integrated admin tooling."
  />
</svelte:head>

<main>
  <header>
    <h1>Freeman Hubbard</h1>
    <p class="headline">Azure Administrator | Microsoft 365 | Entra ID | Intune | PowerShell</p>
    <div class="header-meta">
      Smithtown, NY ·
      <a href="mailto:freemanh.dev@gmail.com">freemanh.dev@gmail.com</a> ·
      <a href="https://www.linkedin.com/in/freeman-hubbard/" target="_blank" rel="noopener">LinkedIn</a> ·
      <a href="https://github.com/fh-200" target="_blank" rel="noopener">GitHub</a>
    </div>
  </header>

  <section id="summary" aria-labelledby="summary-h">
    <h2 id="summary-h">Professional Summary</h2>
    <p>
      AZ-104-certified Azure and Microsoft 365 administrator with hands-on experience supporting
      Entra ID, Intune, Active Directory, endpoint environments, and day-to-day user and device
      operations across client-facing IT settings. Skilled in PowerShell automation, identity and
      access administration, troubleshooting, and technical documentation. Built and deployed
      Microsoft Graph-integrated admin tooling to strengthen practical Azure and identity
      operations experience.
    </p>
  </section>

  <section id="certifications" aria-labelledby="certs-h">
    <h2 id="certs-h">Certifications</h2>
    <ul class="clean">
      <li><strong>Microsoft Certified: Azure Administrator Associate (AZ-104)</strong> — Earned March 2026</li>
      <li><strong>Microsoft Applied Skills:</strong> Get started with identities and access using Microsoft Entra — April 2026</li>
      <li><strong>Microsoft Applied Skills:</strong> Secure storage for Azure Files and Azure Blob Storage — Sept 2025</li>
    </ul>
  </section>

  <section id="skills" aria-labelledby="skills-h">
    <h2 id="skills-h">Core Competencies</h2>
    <div class="chips">
      {#each [
        "Azure Administration",
        "Microsoft 365 Administration",
        "Microsoft Entra ID",
        "Microsoft Intune",
        "PowerShell & Automation",
        "Identity & Access Administration",
        "Active Directory",
        "Endpoint Management",
        "Microsoft Graph API",
        "User Lifecycle Administration",
        "Technical Documentation",
        "Troubleshooting"
      ] as skill}
        <span class="chip">{skill}</span>
      {/each}
    </div>
  </section>

  <section id="experience" aria-labelledby="experience-h">
    <h2 id="experience-h">Professional Experience</h2>

    <div class="item">
      <div class="item-head">
        <div class="item-title">
          IT Support Specialist <span class="item-sub">· Network Outsource</span>
        </div>
        <div class="item-meta">2022–Present</div>
      </div>
      <ul class="clean">
        <li>Administer Microsoft 365, Windows, and endpoint operations across multiple client organizations.</li>
        <li>Manage user accounts, licensing, group membership, and access-related changes in Microsoft 365 and Entra ID.</li>
        <li>Automate recurring administrative and reporting workflows with PowerShell.</li>
        <li>Support Intune device management, compliance policy enforcement, and endpoint troubleshooting.</li>
        <li>Maintain technical documentation for recurring support processes, operational handoffs, and administrative procedures.</li>
      </ul>
    </div>

    <div class="item">
      <div class="item-head">
        <div class="item-title">
          Web Developer <span class="item-sub">· Digital Realms LLC</span>
        </div>
        <div class="item-meta">2020–2022</div>
      </div>
      <ul class="clean">
        <li>Built and deployed web applications using Vue.js, Firebase, and SvelteKit.</li>
        <li>Managed application hosting, deployment, and configuration across modern cloud platforms.</li>
      </ul>
    </div>
  </section>

  <section id="projects" aria-labelledby="projects-h">
    <h2 id="projects-h">Personal Projects</h2>
    <div class="item">
      <div class="item-head">
        <div class="item-title">
          <a href="/admin/users">Identity Operations Portal</a>
        </div>
        <div class="item-meta">2026</div>
      </div>
      <ul class="clean">
        <li>Built a SvelteKit-based admin portal for managing Entra ID users through Microsoft Graph.</li>
        <li>Implemented user retrieval and account update operations against tenant identity data.</li>
        <li>Designed a zero-secret authentication model using Azure Managed Identities.</li>
      </ul>
    </div>
  </section>

  <footer>
    <hr />
  </footer>
</main>

<style>
  :global(body) {
    margin: 0;
    background: var(--bg);
    color: var(--text);
    font-family: Arial, Helvetica, sans-serif;
    line-height: 1.35;
  }

  :root {
    --bg: #ffffff;
    --surface: #ffffff;
    --text: #111111;
    --muted: #4b5563;
    --rule: #d1d5db;
    --link: #0f62fe;
    --chip-bg: #f3f4f6;
  }

  @media (prefers-color-scheme: dark) {
    :root {
      --bg: #0b0d10;
      --surface: #0b0d10;
      --text: #f3f4f6;
      --muted: #a1a1aa;
      --rule: #2a2f37;
      --link: #8ab4ff;
      --chip-bg: #161b22;
    }
  }

  main {
    max-width: 860px;
    margin: 0 auto;
    padding: 28px 32px 36px;
    background: var(--surface);
  }

  header {
    margin-bottom: 18px;
    padding-bottom: 12px;
    border-bottom: 1px solid var(--rule);
  }

  h1 {
    margin: 0 0 6px;
    font-size: 30px;
    line-height: 1.05;
    letter-spacing: -0.02em;
  }

  .headline {
    margin: 0 0 8px;
    font-size: 15px;
    font-weight: 700;
    color: var(--muted);
  }

  .header-meta {
    font-size: 14px;
    color: var(--muted);
  }

  section {
    margin-bottom: 14px;
  }

  h2 {
    margin: 0 0 7px;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .item {
    margin-bottom: 12px;
  }

  .item-head {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 16px;
  }

  .item-title {
    font-size: 15px;
    font-weight: 700;
  }

  .item-sub {
    font-weight: 400;
    color: var(--muted);
  }

  .item-meta {
    font-size: 13px;
    color: var(--muted);
  }

  ul.clean {
    padding-left: 18px;
  }

  ul.clean li {
    margin-bottom: 4px;
    font-size: 14px;
  }

  .chips {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }

  .chip {
    padding: 4px 8px;
    font-size: 12px;
    border: 1px solid var(--rule);
    background: var(--chip-bg);
    border-radius: 999px;
  }

  a {
    color: var(--link);
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  @media print {
    main {
      max-width: none;
      padding: 0;
    }
  }
</style>