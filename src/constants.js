export const SEED_PROMPTS = [
  {
    id: 'nmap-scan',
    title: 'Explain Nmap Scan Types',
    description: 'Learn the difference between -sS, -sT, and -sU scans.',
    category: 'Network',
    text: 'Can you explain the difference between a TCP SYN scan (-sS), a TCP Connect scan (-sT), and a UDP scan (-sU) in Nmap? When would I use each?'
  },
  {
    id: 'sql-injection-basics',
    title: 'SQL Injection Fundamentals',
    description: 'Understand the concept of SQLi and how to prevent it.',
    category: 'Web',
    text: 'Explain the basic concept of SQL injection. Show me a simple vulnerable code snippet in PHP and how it can be exploited, then show me the corrected version using prepared statements.'
  },
  {
    id: 'owasp-top-10',
    title: 'OWASP Top 10 Overview',
    description: 'A summary of the most critical web security risks.',
    category: 'Basics',
    text: 'What are the current top 3 vulnerabilities in the OWASP Top 10, and why are they considered the most critical?'
  },
  {
    id: 'buffer-overflow',
    title: 'Buffer Overflow Theory',
    description: 'Learn how memory corruption vulnerabilities work.',
    category: 'System',
    text: 'Can you explain the mechanics of a stack-based buffer overflow? Use a clear analogy to help me understand how the return address is overwritten.'
  },
  {
    id: 'wireshark-filters',
    title: 'Common Wireshark Filters',
    description: 'Cheat sheet for analyzing network traffic.',
    category: 'Network',
    text: 'Provide a list of 5 essential Wireshark display filters for troubleshooting HTTP traffic and finding unusual DNS queries.'
  },
  {
    id: 'xss-types',
    title: 'Types of Cross-Site Scripting',
    description: 'Understand Reflected, Stored, and DOM-based XSS.',
    category: 'Web',
    text: 'What are the three main types of Cross-Site Scripting (XSS)? Provide a brief scenario for how each one could be used by an attacker.'
  },
  {
    id: 'linux-privesc',
    title: 'Linux Privilege Escalation',
    description: 'Basic techniques for moving from user to root.',
    category: 'System',
    text: 'Explain 3 common methods for privilege escalation on a Linux system. What are SUID bit vulnerabilities and how can they be identified?'
  },
  {
    id: 'hydra-basics',
    title: 'Brute Forcing with Hydra',
    description: 'Learn how to automate login attacks legally.',
    category: 'Basics',
    text: 'Explain how the tool THC Hydra works. Provide an example command for brute forcing an SSH service given a username list and a password list.'
  },
  {
    id: 'broken-access-control',
    title: 'Broken Access Control',
    description: 'How authorization fails in web applications.',
    category: 'Web',
    text: 'What is Broken Access Control (BAC)? Explain the difference between horizontal and vertical privilege escalation with examples.'
  },
  {
    id: 'social-engineering',
    title: 'Social Engineering Principles',
    description: 'The human element of cybersecurity.',
    category: 'Basics',
    text: 'What are the psychological principles commonly used in social engineering attacks (e.g., authority, urgency, scarcity)? How can organizations train employees to resist them?'
  },
  {
    id: 'ssh-tunneling',
    title: 'SSH Tunneling Explained',
    description: 'Bypassing firewalls and securing traffic.',
    category: 'Network',
    text: 'Explain the difference between Local Port Forwarding and Remote Port Forwarding in SSH. When would a security professional use a Dynamic port forward (-D)?'
  }
];

export const TUTORIALS = [
  {
    id: 'wifi-blind-connect',
    title: 'Blind WiFi Access',
    category: 'Network',
    description: 'Protocol for connecting to a known SSID without credentials using handshake capture.',
    steps: [
      { title: 'Monitor Mode', content: 'Set interface to monitor mode: `airmon-ng start wlan0`' },
      { title: 'BSSID Discovery', content: 'Locate Target SSID BSSID: `airodump-ng wlan0mon`' },
      { title: 'Handshake Capture', content: 'Wait for client or force deauth: `aireplay-ng -0 5 -a <BSSID> wlan0mon`' },
      { title: 'Offline Crack', content: 'Run wordlist against capture: `aircrack-ng -w list.txt capture.cap`' }
    ]
  },
  {
    id: 'hidden-ssid',
    title: 'Hidden SSID Reveal',
    category: 'Network',
    description: 'De-masking broadcast-disabled wireless networks.',
    steps: [
      { title: 'Identify Null SSID', content: 'Find probes with no name in airodump-ng' },
      { title: 'Wait for Association', content: 'SSID is revealed in packets when a valid client connects.' }
    ]
  },
  {
    id: 'idor-check',
    title: 'IDOR API Audit',
    category: 'Web',
    description: 'Testing for insecure direct object references in user endpoints.',
    steps: [
      { title: 'Baseline', content: 'Observe `GET /api/user/101`' },
      { title: 'Manipulation', content: 'Attempt `GET /api/user/102`' },
      { title: 'Validation', content: 'Verify if 200 OK leaks PII of another user.' }
    ]
  },
  {
    id: 'sqli-error',
    title: 'Error-Based SQLi',
    category: 'Web',
    description: 'Quick check for backend database vulnerabilities.',
    steps: [
      { title: 'Inject', content: "Append `'` or `\"` to input fields." },
      { title: 'Analyze', content: 'Look for MySQL/PostgreSQL syntax errors in response.' }
    ]
  },
  {
    id: 'lfi-discovery',
    title: 'LFI File Reveal',
    category: 'Web',
    description: 'Traversing the filesystem via URL parameters.',
    steps: [
      { title: 'Test', content: 'Change `?page=home` to `?page=../../../../etc/passwd`' }
    ]
  },
  {
    id: 'nmap-stealth',
    title: 'Stealth Recon',
    category: 'Network',
    description: 'Scanning ports while minimizing IDS triggers.',
    steps: [
      { title: 'Command', content: '`nmap -sS -T2 -Pn <target>`' }
    ]
  },
  {
    id: 'dir-brute',
    title: 'Directory Discovery',
    category: 'Web',
    description: 'Finding hidden admin panels or backup files.',
    steps: [
      { title: 'Tool', content: '`gobuster dir -u <url> -w common.txt`' }
    ]
  },
  {
    id: 'ssh-banner',
    title: 'SSH Banner Grab',
    category: 'Network',
    description: 'Identifying service versions via raw connection.',
    steps: [
      { title: 'Command', content: '`nc -vn <ip> 22`' }
    ]
  },
  {
    id: 'hash-crack',
    title: 'MD5 Wordlist Crack',
    category: 'Basics',
    description: 'Recovering passwords from MD5 hashes.',
    steps: [
      { title: 'Tool', content: '`hashcat -m 0 hash.txt rockyou.txt`' }
    ]
  },
  {
    id: 'xss-stored',
    title: 'Stored XSS Check',
    category: 'Web',
    description: 'Testing comment fields for persistent scripts.',
    steps: [
       { title: 'Payload', content: '`<script>alert(1)</script>`' }
    ]
  },
  {
    id: 'smb-enum',
    title: 'SMB Share Listing',
    category: 'System',
    description: 'Finding open file shares on Windows networks.',
    steps: [
      { title: 'Command', content: '`smbclient -L //<ip>/`' }
    ]
  },
  {
    id: 'snmp-walk',
    title: 'SNMP Enumeration',
    category: 'Network',
    description: 'Extracting system info via public community strings.',
    steps: [
      { title: 'Command', content: '`snmpwalk -v2c -c public <ip>`' }
    ]
  },
  {
    id: 'waf-detect',
    title: 'WAF Identification',
    category: 'Web',
    description: 'Detecting if a WAF is protecting the site.',
    steps: [
      { title: 'Tool', content: '`wafw00f <url>`' }
    ]
  },
  {
    id: 'sub-enum',
    title: 'Subdomain Search',
    category: 'Network',
    description: 'Finding secondary assets via DNS/Transparency logs.',
    steps: [
      { title: 'Tool', content: '`subfinder -d <domain>`' }
    ]
  },
  {
    id: 's3-bucket',
    title: 'Public S3 Audit',
    category: 'Network',
    description: 'Checking for open AWS storage buckets.',
    steps: [
      { title: 'Tool', content: '`aws s3 ls s3://<bucket-name> --no-sign-request`' }
    ]
  },
  {
    id: 'git-leak',
    title: 'Git History Leak',
    category: 'System',
    description: 'Finding secrets in exposed .git directories.',
    steps: [
       { title: 'Tool', content: '`git-dumper <url>/.git/ output/`' }
    ]
  },
  {
    id: 'jwt-none',
    title: 'JWT None Algorithm',
    category: 'Web',
    description: 'Bypassing auth by setting JWT alg to None.',
    steps: [
      { title: 'Action', content: 'Modify JWT header to `{"alg":"None"}` and remove signature.' }
    ]
  },
  {
    id: 'suid-find',
    title: 'SUID Root Search',
    category: 'System',
    description: 'Finding binaries with root permissions.',
    steps: [
      { title: 'Command', content: '`find / -perm -4000 2>/dev/null`' }
    ]
  },
  {
    id: 'arp-spoof',
    title: 'ARP Poisoning',
    category: 'Network',
    description: 'Intercepting local traffic via MITM.',
    steps: [
      { title: 'Command', content: '`arpspoof -i eth0 -t <target_ip> <gateway_ip>`' }
    ]
  },
  {
    id: 'brute-force',
    title: 'HTTP Brute Force',
    category: 'Web',
    description: 'Automated login attacks.',
    steps: [
      { title: 'Tool', content: '`hydra -l admin -P wordlist.txt <ip> http-post-form "/login.php:user=^USER^&pass=^PASS^:F=Login failed"`' }
    ]
  },
  {
    id: 'cve-scan',
    title: 'Vulnerability Scan',
    category: 'System',
    description: 'Scanning for known CVEs using Nmap scripts.',
    steps: [
      { title: 'Command', content: '`nmap --script vuln <ip>`' }
    ]
  }
];
