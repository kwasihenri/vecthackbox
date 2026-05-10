# VecthackBox 🛡️💻

## 🎯 Project Overview
VecthackBox is a curated learning environment designed to bridge the gap between basic networking and advanced security exploitation. 

## Home screens

![Home Page](screenshots/homepage.png)


## 🛠️ Core Research Areas
* **Reconnaissance:** Advanced `nmap` scripting and TCP handshake analysis.
* **Wireless Security:** Real-world testing of the ***HackerOne*** WPA2 Handshakes, PMKID, and Evil Twin attacks.
* **Spoofing & Identity:** Bypassing ACLs via MAC changes and ARP cache poisoning.
* **MITM Frameworks:** Comparative study of legacy `MITMf` vs. modern `Bettercap` capabilities.

## ⚖️ Disclaimer
This repository is for **educational and ethical hacking purposes only**. All techniques should be performed in a controlled environment with explicit permission.

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px;">
<img src="screenshots/prompt_library.png" alt="Prompt Library">
<img src="screenshots/terminal_test_cases.png" alt="Terminal Test Cases">
</div>

## Run Locally

**Prerequisites:**  Node.js
Cloning:
```bash
git clone https://github.com/kwasihenri/vecthackbox.git
cd vecthackbox
```
Install dependencies:
```bash
npm install
```
Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
```bash
npm run dev
```

[vecthackbox on github](https://github.com/kwasihenri/vecthackbox)

Developer: [Kwasi Henri](https://github.com/kwasihenri)

