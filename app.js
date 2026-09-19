/**
 * ==========================================================================
 * FZ NX ENTERPRISE CLOUD PLATFORM
 * SCRIPT ENGINE: app.js (Production Ready)
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {

  /* --------------------------------------------------------------------------
     1. GLOBAL APPLICATION STATE & CONSTANTS
     -------------------------------------------------------------------------- */
  const APP_STATE = {
    currency: 'IDR',
    rateUsd: 16000,
    activeCategory: 'all',
    searchQuery: '',
    selectedCalcType: 'ptero',
    serverNodes: {
      jkt: { name: 'Jakarta (JKT-01)', lat: -6.2088, lon: 106.8456, ping: '12ms', ip: '103.152.112.1' },
      sin: { name: 'Singapura (SIN-02)', lat: 1.3521, lon: 103.8198, ping: '19ms', ip: '139.180.200.5' },
      tyo: { name: 'Tokyo (TYO-01)', lat: 35.6762, lon: 139.6503, ping: '68ms', ip: '133.242.180.12' },
      fra: { name: 'Frankfurt (FRA-01)', lat: 50.1109, lon: 8.6821, ping: '142ms', ip: '194.12.80.44' },
      usa: { name: 'Virginia (US-EAST)', lat: 37.4316, lon: -78.6569, ping: '185ms', ip: '198.51.100.22' }
    }
  };

  /* --------------------------------------------------------------------------
     2. TOAST NOTIFICATION UTILITY
     -------------------------------------------------------------------------- */
  const toastEl = document.getElementById('toast');
  let toastTimer = null;

  function showToast(message, duration = 3000) {
    if (!toastEl) return;
    clearTimeout(toastTimer);
    toastEl.textContent = message;
    toastEl.classList.add('show');
    toastTimer = setTimeout(() => {
      toastEl.classList.remove('show');
    }, duration);
  }

  /* --------------------------------------------------------------------------
     3. KERNEL BOOTLOADER SEQUENCE
     -------------------------------------------------------------------------- */
  const bootLogs = [
    "[SYS] Memuat modul virtualisasi KVM & Docker socket...",
    "[NET] Mengonfigurasi gateway BGP Jakarta & Singapore...",
    "[SEC] Mengaktifkan proteksi DDoS & mitigasi L7...",
    "[WINGS] Memverifikasi node daemon Pterodactyl cgroups v2...",
    "[READY] Sistem FZ NX siap menerima koneksi operasional."
  ];

  let bootIndex = 0;
  let bootProgress = 0;
  const loaderBar = document.getElementById('loader-bar');
  const loaderPercent = document.getElementById('loader-percent');
  const terminalLog = document.getElementById('terminal-log');
  const preloader = document.getElementById('preloader');

  const bootInterval = setInterval(() => {
    bootProgress += Math.floor(Math.random() * 12) + 6;
    if (bootProgress > 100) bootProgress = 100;

    if (loaderBar) loaderBar.style.width = `${bootProgress}%`;
    if (loaderPercent) loaderPercent.textContent = `${bootProgress}%`;

    if (bootProgress > (bootIndex + 1) * 20 && bootIndex < bootLogs.length && terminalLog) {
      const line = document.createElement('div');
      line.textContent = bootLogs[bootIndex];
      if (bootIndex === bootLogs.length - 1) line.classList.add('highlight');
      terminalLog.appendChild(line);
      terminalLog.scrollTop = terminalLog.scrollHeight;
      bootIndex++;
    }

    if (bootProgress >= 100) {
      clearInterval(bootInterval);
      setTimeout(() => {
        if (preloader) preloader.classList.add('loaded');
        checkScrollTeleport();
      }, 350);
    }
  }, 85);

  /* --------------------------------------------------------------------------
     4. TELEPORTATION PARTICLES ENGINE (CANVAS 2D)
     -------------------------------------------------------------------------- */
  const tpCanvas = document.getElementById('teleport-canvas');
  const tpCtx = tpCanvas ? tpCanvas.getContext('2d') : null;
  let tpParticles = [];

  function resizeTeleportCanvas() {
    if (!tpCanvas) return;
    tpCanvas.width = window.innerWidth;
    tpCanvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeTeleportCanvas);
  resizeTeleportCanvas();

  class QuantumParticle {
    constructor(x, y, color) {
      this.x = x;
      this.y = y;
      this.size = Math.random() * 3 + 1.5;
      this.speedX = (Math.random() - 0.5) * 8;
      this.speedY = (Math.random() - 0.8) * 10;
      this.life = 1;
      this.decay = Math.random() * 0.03 + 0.02;
      this.color = color || '#38bdf8';
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.life -= this.decay;
      this.size *= 0.95;
    }

    draw(ctx) {
      ctx.save();
      ctx.globalAlpha = Math.max(0, this.life);
      ctx.fillStyle = this.color;
      ctx.shadowBlur = 12;
      ctx.shadowColor = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  function spawnTeleportBurst(rect) {
    if (!tpCanvas) return;
    const count = 40;
    const colors = ['#38bdf8', '#2563eb', '#93c5fd', '#ffffff'];
    for (let i = 0; i < count; i++) {
      const x = rect.left + Math.random() * rect.width;
      const y = rect.top + rect.height * (0.6 + Math.random() * 0.4);
      const c = colors[Math.floor(Math.random() * colors.length)];
      tpParticles.push(new QuantumParticle(x, y, c));
    }
  }

  function runTeleportLoop() {
    if (tpCtx && tpCanvas) {
      tpCtx.clearRect(0, 0, tpCanvas.width, tpCanvas.height);
      for (let i = tpParticles.length - 1; i >= 0; i--) {
        const p = tpParticles[i];
        p.update();
        p.draw(tpCtx);
        if (p.life <= 0 || p.size <= 0.2) {
          tpParticles.splice(i, 1);
        }
      }
    }
    requestAnimationFrame(runTeleportLoop);
  }
  runTeleportLoop();

  /* --------------------------------------------------------------------------
     5. DYNAMIC SCROLL PROGRESS & TELEPORT TRIGGER
     -------------------------------------------------------------------------- */
  const teleportNodes = document.querySelectorAll('.teleport-scroll');
  const scrollProgress = document.getElementById('scroll-progress');

  function checkScrollTeleport() {
    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    if (scrollProgress && totalHeight > 0) {
      const pct = (winScroll / totalHeight) * 100;
      scrollProgress.style.width = `${pct}%`;
    }

    const triggerLimit = window.innerHeight * 0.92;
    teleportNodes.forEach(node => {
      const rect = node.getBoundingClientRect();
      if (rect.top < triggerLimit && !node.classList.contains('teleported')) {
        node.classList.add('teleporting');
        node.classList.add('teleported');
        spawnTeleportBurst(rect);
        setTimeout(() => node.classList.remove('teleporting'), 700);
      }
    });
  }

  window.addEventListener('scroll', checkScrollTeleport, { passive: true });

  /* --------------------------------------------------------------------------
     6. PHOTOREALISTIC 3D EARTH GLOBE (THREE.JS)
     -------------------------------------------------------------------------- */
  const globeBox = document.getElementById('globe-canvas');
  let scene, camera, renderer, earthGroup, earthMesh, cloudMesh, atmosMesh;
  const radarRings = [];
  const dataPackets = [];

  let isDragging = false;
  let prevX = 0, prevY = 0;
  let targetRotX = 0.2, targetRotY = 0;

  function initRealisticGlobe() {
    if (!globeBox) return;

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, globeBox.clientWidth / globeBox.clientHeight, 0.1, 1000);
    camera.position.z = 2.65;

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(globeBox.clientWidth, globeBox.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    globeBox.appendChild(renderer.domElement);

    const loader = new THREE.TextureLoader();
    loader.setCrossOrigin('anonymous');

    earthGroup = new THREE.Group();
    scene.add(earthGroup);

    // 1. Earth Body Sphere
    const earthMap = loader.load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg');
    const earthSpec = loader.load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_specular_2048.jpg');
    const earthGeo = new THREE.SphereGeometry(1, 64, 64);
    const earthMat = new THREE.MeshPhongMaterial({
      map: earthMap,
      specularMap: earthSpec,
      specular: new THREE.Color(0x334455),
      shininess: 25
    });
    earthMesh = new THREE.Mesh(earthGeo, earthMat);
    earthGroup.add(earthMesh);

    // 2. Cloud Layer
    const cloudTexture = loader.load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_clouds_1024.png');
    const cloudGeo = new THREE.SphereGeometry(1.018, 64, 64);
    const cloudMat = new THREE.MeshLambertMaterial({
      map: cloudTexture,
      transparent: true,
      opacity: 0.75
    });
    cloudMesh = new THREE.Mesh(cloudGeo, cloudMat);
    earthGroup.add(cloudMesh);

    // 3. Rayleigh Atmosphere Glow
    const atmosGeo = new THREE.SphereGeometry(1.15, 64, 64);
    const atmosMat = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.68 - dot(vNormal, vec3(0, 0, 1.0)), 2.0);
          gl_FragColor = vec4(0.22, 0.65, 0.98, 1.0) * intensity;
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true
    });
    atmosMesh = new THREE.Mesh(atmosGeo, atmosMat);
    scene.add(atmosMesh);

    // 4. Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.45));
    const sun = new THREE.DirectionalLight(0xffffff, 1.4);
    sun.position.set(5, 3, 5);
    scene.add(sun);

    // 5. 3D Upright Map Drop Pins
    Object.keys(APP_STATE.serverNodes).forEach(k => {
      const n = APP_STATE.serverNodes[k];
      const pos = latLonToVec3(n.lat, n.lon, 1.0);

      // Needle
      const needleGeo = new THREE.CylinderGeometry(0.005, 0.002, 0.09, 8);
      needleGeo.translate(0, 0.045, 0);
      needleGeo.rotateX(Math.PI / 2);
      const needleMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
      const needle = new THREE.Mesh(needleGeo, needleMat);
      needle.position.copy(pos);
      needle.lookAt(pos.clone().multiplyScalar(2));
      earthGroup.add(needle);

      // Pin Head
      const headGeo = new THREE.SphereGeometry(0.024, 16, 16);
      const headMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const head = new THREE.Mesh(headGeo, headMat);
      const headPos = pos.clone().add(pos.clone().normalize().multiplyScalar(0.09));
      head.position.copy(headPos);
      earthGroup.add(head);

      // Ground Wave Radar Ring
      const ringGeo = new THREE.RingGeometry(0.015, 0.038, 24);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.8
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.copy(pos.clone().multiplyScalar(1.002));
      ring.lookAt(pos.clone().multiplyScalar(2));
      earthGroup.add(ring);
      radarRings.push({ mesh: ring, scale: 1 });
    });

    // 6. BGP Transit Flight Arcs
    const routes = [
      ['jkt', 'sin'],
      ['sin', 'tyo'],
      ['sin', 'fra'],
      ['fra', 'usa'],
      ['tyo', 'usa']
    ];

    routes.forEach(pair => {
      const p1 = latLonToVec3(APP_STATE.serverNodes[pair[0]].lat, APP_STATE.serverNodes[pair[0]].lon, 1.0);
      const p2 = latLonToVec3(APP_STATE.serverNodes[pair[1]].lat, APP_STATE.serverNodes[pair[1]].lon, 1.0);

      const mid = p1.clone().add(p2).multiplyScalar(0.5);
      const dist = p1.distanceTo(p2);
      mid.normalize().multiplyScalar(1.0 + dist * 0.28);

      const curve = new THREE.QuadraticBezierCurve3(p1, mid, p2);
      const pts = curve.getPoints(40);
      const lineGeo = new THREE.BufferGeometry().setFromPoints(pts);
      const lineMat = new THREE.LineBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.35 });
      earthGroup.add(new THREE.Line(lineGeo, lineMat));

      const packetGeo = new THREE.SphereGeometry(0.014, 8, 8);
      const packetMat = new THREE.MeshBasicMaterial({ color: 0x67e8f9 });
      const packet = new THREE.Mesh(packetGeo, packetMat);
      earthGroup.add(packet);
      dataPackets.push({ mesh: packet, curve, progress: Math.random() });
    });

    // Mouse Controls
    globeBox.addEventListener('mousedown', e => {
      isDragging = true;
      prevX = e.clientX;
      prevY = e.clientY;
    });
    window.addEventListener('mouseup', () => isDragging = false);
    window.addEventListener('mousemove', e => {
      if (!isDragging) return;
      const dx = e.clientX - prevX;
      const dy = e.clientY - prevY;
      targetRotY += dx * 0.005;
      targetRotX += dy * 0.005;
      prevX = e.clientX;
      prevY = e.clientY;
    });

    window.addEventListener('resize', () => {
      if (!camera || !renderer || !globeBox) return;
      camera.aspect = globeBox.clientWidth / globeBox.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(globeBox.clientWidth, globeBox.clientHeight);
    });

    renderGlobeLoop();
  }

  function latLonToVec3(lat, lon, r = 1) {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);
    return new THREE.Vector3(
      -r * Math.sin(phi) * Math.cos(theta),
      r * Math.cos(phi),
      r * Math.sin(phi) * Math.sin(theta)
    );
  }

  function renderGlobeLoop() {
    requestAnimationFrame(renderGlobeLoop);
    if (!earthGroup || !cloudMesh || !renderer || !scene || !camera) return;

    if (!isDragging) {
      targetRotY += 0.0012;
    }

    earthGroup.rotation.y += (targetRotY - earthGroup.rotation.y) * 0.06;
    earthGroup.rotation.x += (targetRotX - earthGroup.rotation.x) * 0.06;
    cloudMesh.rotation.y += 0.0006;

    // Pulse radar rings
    radarRings.forEach(r => {
      r.scale += 0.018;
      r.mesh.scale.set(r.scale, r.scale, 1);
      r.mesh.material.opacity = Math.max(0, 0.8 - (r.scale - 1) * 0.6);
      if (r.scale > 2.2) r.scale = 1;
    });

    // Move data packets
    dataPackets.forEach(dp => {
      dp.progress += 0.008;
      if (dp.progress > 1) dp.progress = 0;
      dp.mesh.position.copy(dp.curve.getPoint(dp.progress));
    });

    renderer.render(scene, camera);
  }

  initRealisticGlobe();

  // Globe Node Selector Buttons
  const nodeBtns = document.querySelectorAll('.node-btn');
  const hudPing = document.getElementById('hud-ping');

  nodeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      nodeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const key = btn.dataset.city;
      const target = APP_STATE.serverNodes[key];
      if (!target) return;

      const phi = (90 - target.lat) * (Math.PI / 180);
      const theta = (target.lon + 180) * (Math.PI / 180);

      targetRotX = phi - Math.PI / 2;
      targetRotY = -theta - Math.PI / 2;

      if (hudPing) {
        hudPing.textContent = `Status: Node ${target.name} (${target.ping}) Online`;
      }
    });
  });

  /* --------------------------------------------------------------------------
     7. INTERACTIVE PTERODACTYL TERMINAL SIMULATOR
     -------------------------------------------------------------------------- */
  const pteroScreen = document.getElementById('ptero-screen');
  const pteroInput = document.getElementById('ptero-cli-input');
  const cmdHistory = [];
  let historyPointer = -1;

  function printPteroLine(text, isErr = false) {
    if (!pteroScreen) return;
    const div = document.createElement('div');
    div.style.color = isErr ? '#ef4444' : '#cbd5e1';
    div.textContent = text;
    pteroScreen.appendChild(div);
    pteroScreen.scrollTop = pteroScreen.scrollHeight;
  }

  if (pteroScreen && pteroInput) {
    printPteroLine("[SOCKET] Terhubung ke Wings Daemon ws://node-jkt01.fznx.net:8080/live [OK]");
    printPteroLine("[KERNEL] Cgroups v2 isolation layer active. Ketik 'help' untuk daftar perintah.");

    pteroInput.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        const raw = pteroInput.value.trim();
        if (raw) {
          cmdHistory.push(raw);
          historyPointer = cmdHistory.length;
          execPteroCommand(raw);
          pteroInput.value = '';
        }
      } else if (e.key === 'ArrowUp') {
        if (historyPointer > 0) {
          historyPointer--;
          pteroInput.value = cmdHistory[historyPointer];
        }
      } else if (e.key === 'ArrowDown') {
        if (historyPointer < cmdHistory.length - 1) {
          historyPointer++;
          pteroInput.value = cmdHistory[historyPointer];
        } else {
          historyPointer = cmdHistory.length;
          pteroInput.value = '';
        }
      }
    });
  }

  function execPteroCommand(cmd) {
    printPteroLine(`admin@fznx:~$ ${cmd}`);
    const parts = cmd.toLowerCase().split(' ');
    const main = parts[0];

    switch (main) {
      case 'help':
        printPteroLine("Perintah tersedia:");
        printPteroLine("  status     - Cek status Wings Daemon & cgroups");
        printPteroLine("  stats      - Pemantauan alokasi memori & CPU host");
        printPteroLine("  docker ps  - Tampilkan kontainer Egg yang aktif");
        printPteroLine("  ping       - Cek latensi heartbeat node");
        printPteroLine("  restart    - Simulasi reboot aman daemon");
        printPteroLine("  clear      - Bersihkan layar console");
        break;

      case 'status':
        printPteroLine("[STATUS] Daemon: ONLINE (Wings v1.11.8)");
        printPteroLine("[SECURITY] BGP Flowspec Filter: MITIGATING 0 ATTACKS");
        printPteroLine("[STORAGE] ZFS Pool: HEALTHY (IOPS: 1,840)");
        break;

      case 'stats':
        printPteroLine("--- TELEMETRI HOST NODE JKT-01 ---");
        printPteroLine("CPU: AMD EPYC 7763 64-Core (Usage: 14.8%)");
        printPteroLine("RAM: 144.2 GB / 256.0 GB Alokasi NVMe Swap");
        printPteroLine("Uplink: 10Gbps SFP+ Full Duplex");
        break;

      case 'docker':
        if (parts[1] === 'ps') {
          printPteroLine("CONTAINER ID   IMAGE                 STATUS         PORTS");
          printPteroLine("e49a1bc0f12a   pterodactyl/wings     Up 18 days     0.0.0.0:8080->8080/tcp");
          printPteroLine("a89c02d19e41   itzg/minecraft-server Up 4 days      0.0.0.0:25565->25565/tcp");
          printPteroLine("c1048bfa2910   node:20-alpine        Up 12 hours    0.0.0.0:3000->3000/tcp");
        } else {
          printPteroLine("Argumen tidak lengkap. Gunakan: docker ps", true);
        }
        break;

      case 'ping':
        printPteroLine("64 bytes from edge-gateway.fznx.net: seq=1 time=1.24 ms");
        printPteroLine("64 bytes from edge-gateway.fznx.net: seq=2 time=1.18 ms");
        break;

      case 'restart':
        printPteroLine("[WINGS] Mengirim sinyal SIGTERM...");
        setTimeout(() => printPteroLine("[WINGS] Sinkronisasi cgroups sockets..."), 400);
        setTimeout(() => printPteroLine("[WINGS] Daemon kembali online [OK]"), 1000);
        break;

      case 'clear':
        if (pteroScreen) pteroScreen.innerHTML = '';
        break;

      default:
        printPteroLine(`Perintah '${cmd}' tidak ditemukan. Ketik 'help' untuk panduan.`, true);
        break;
    }
  }

  /* --------------------------------------------------------------------------
     8. SEARCH & FILTER KATALOG PRODUK
     -------------------------------------------------------------------------- */
  const catalogCards = document.querySelectorAll('.product-card');
  const catalogFilterBtns = document.querySelectorAll('.tab-btn[data-filter]');
  const searchInput = document.getElementById('catalog-search');

  function applyProductFilters() {
    catalogCards.forEach(card => {
      const cat = card.dataset.category;
      const searchTerms = (card.dataset.search || '').toLowerCase();
      const text = card.innerText.toLowerCase();

      const matchCat = (APP_STATE.activeCategory === 'all' || cat === APP_STATE.activeCategory);
      const matchQuery = (!APP_STATE.searchQuery || searchTerms.includes(APP_STATE.searchQuery) || text.includes(APP_STATE.searchQuery));

      card.style.display = (matchCat && matchQuery) ? 'flex' : 'none';
    });
  }

  catalogFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      catalogFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      APP_STATE.activeCategory = btn.dataset.filter;
      applyProductFilters();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', e => {
      APP_STATE.searchQuery = e.target.value.toLowerCase().trim();
      applyProductFilters();
    });
  }

  /* --------------------------------------------------------------------------
     9. CURRENCY SWITCHER (IDR <-> USD)
     -------------------------------------------------------------------------- */
  const currencyToggle = document.getElementById('currency-toggle');

  function formatCurrency(amountIdr) {
    if (APP_STATE.currency === 'USD') {
      const val = (amountIdr / APP_STATE.rateUsd).toFixed(2);
      return `$${val}`;
    }
    return `Rp ${amountIdr.toLocaleString('id-ID')}`;
  }

  function refreshAllPrices() {
    document.querySelectorAll('.price-val[data-base-idr]').forEach(el => {
      const base = parseInt(el.dataset.baseIdr, 10);
      const small = el.querySelector('small') ? el.querySelector('small').outerHTML : '';
      el.innerHTML = `${formatCurrency(base)}${small}`;
    });
    calculateResourceCost();
  }

  if (currencyToggle) {
    currencyToggle.addEventListener('click', () => {
      APP_STATE.currency = (APP_STATE.currency === 'IDR') ? 'USD' : 'IDR';
      currencyToggle.textContent = (APP_STATE.currency === 'IDR') ? 'IDR (Rp)' : 'USD ($)';
      showToast(`Mata uang diubah ke ${APP_STATE.currency}`);
      refreshAllPrices();
    });
  }

  /* --------------------------------------------------------------------------
     10. LOOKING GLASS / NETWORK TEST RUNNER
     -------------------------------------------------------------------------- */
  const btnRunLg = document.getElementById('btn-run-lg');
  const lgNode = document.getElementById('lg-node');
  const lgType = document.getElementById('lg-test-type');
  const lgTarget = document.getElementById('lg-target');
  const lgTerminal = document.getElementById('lg-terminal');

  if (btnRunLg && lgTerminal) {
    btnRunLg.addEventListener('click', () => {
      const nodeName = lgNode.options[lgNode.selectedIndex].text;
      const test = lgType.value;
      const target = (lgTarget.value || '1.1.1.1').trim();

      lgTerminal.textContent = `[INIT] Menghubungkan ke ${nodeName}...\n[EXEC] Menjalankan ${test.toUpperCase()} ke ${target}...\n`;
      btnRunLg.disabled = true;

      let steps = [];
      if (test === 'ping') {
        steps = [
          `PING ${target} (56 data bytes)`,
          `64 bytes from ${target}: icmp_seq=1 ttl=58 time=11.4 ms`,
          `64 bytes from ${target}: icmp_seq=2 ttl=58 time=12.0 ms`,
          `64 bytes from ${target}: icmp_seq=3 ttl=58 time=11.7 ms`,
          `--- ${target} ping statistics ---`,
          `3 packets transmitted, 3 received, 0% packet loss, rtt min/avg/max = 11.4/11.7/12.0 ms`
        ];
      } else if (test === 'traceroute') {
        steps = [
          `traceroute to ${target} (30 hops max, 60 byte packets)`,
          ` 1  gateway.edge-fznx.net (10.240.0.1)  0.342 ms`,
          ` 2  103.152.112.1 (AS140023 FZ-NX-BGP)  1.218 ms`,
          ` 3  ix-jkt.equinix.com (182.25.12.9)  3.411 ms`,
          ` 4  ${target} (Target Host)  11.230 ms [AS13335]`
        ];
      } else {
        steps = [
          `Membuka socket throughput 10Gbps uplink...`,
          `Chunk 25MB: [████████████░░░░░░░░░░░░] 260.4 Mbps`,
          `Chunk 50MB: [████████████████████░░░░] 530.8 Mbps`,
          `Chunk 100MB: [████████████████████████] 954.1 Mbps`,
          `Uji selesai: Rata-rata 914.8 Mbps. Tanpa packet drop.`
        ];
      }

      let i = 0;
      const timer = setInterval(() => {
        if (i < steps.length) {
          lgTerminal.textContent += `${steps[i]}\n`;
          lgTerminal.scrollTop = lgTerminal.scrollHeight;
          i++;
        } else {
          clearInterval(timer);
          btnRunLg.disabled = false;
        }
      }, 400);
    });
  }

  /* --------------------------------------------------------------------------
     11. CLI BUILDER GENERATOR
     -------------------------------------------------------------------------- */
  const cliPresets = {
    discord: "docker run -d --name bot-discord --restart unless-stopped -v /home/data:/app node:20-alpine npm start",
    python: "docker run -d --name api-fastapi -p 8000:8000 -v $(pwd):/app python:3.11-slim uvicorn main:app --host 0.0.0.0",
    minecraft: "docker run -d -it -p 25565:25565 -e EULA=TRUE -e MEMORY=4G itzg/minecraft-server",
    wings: "curl -sSL https://get.pterodactyl.io/wings | sudo bash -s -- --node-token=FZNX_NODE_SECURE"
  };

  const cliCodeText = document.getElementById('cli-code-text');
  const cliPresetBtns = document.querySelectorAll('.cli-preset-btn');
  const btnCopyCli = document.getElementById('btn-copy-cli');

  cliPresetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      cliPresetBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      if (cliCodeText) cliCodeText.textContent = cliPresets[btn.dataset.preset];
    });
  });

  if (btnCopyCli && cliCodeText) {
    btnCopyCli.addEventListener('click', () => {
      navigator.clipboard.writeText(cliCodeText.textContent);
      showToast("Perintah Docker berhasil disalin ke clipboard!");
    });
  }

  /* --------------------------------------------------------------------------
     12. RESOURCE CALCULATOR & QUOTATION MODAL
     -------------------------------------------------------------------------- */
  const inputRam = document.getElementById('input-ram');
  const inputCpu = document.getElementById('input-cpu');
  const valRam = document.getElementById('val-ram');
  const valCpu = document.getElementById('val-cpu');
  const calcTotal = document.getElementById('calc-total');
  const typeBtns = document.querySelectorAll('.type-btn');
  const calcOrderBtn = document.getElementById('calc-order-btn');
  const calcInvoiceBtn = document.getElementById('calc-invoice-btn');

  typeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      typeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      APP_STATE.selectedCalcType = btn.dataset.type;
      calculateResourceCost();
    });
  });

  function calculateResourceCost() {
    if (!inputRam || !inputCpu || !calcTotal) return { ram: 4, cpu: 2, totalIdr: 65000 };

    const ram = parseInt(inputRam.value, 10);
    const cpu = parseInt(inputCpu.value, 10);

    if (valRam) valRam.textContent = `${ram} GB`;
    if (valCpu) valCpu.textContent = `${cpu} Core`;

    let base = 15000;
    if (APP_STATE.selectedCalcType === 'vps') base = 35000;
    if (APP_STATE.selectedCalcType === 'rdp') base = 50000;

    const totalIdr = base + (ram * 10000) + (cpu * 15000);
    calcTotal.textContent = formatCurrency(totalIdr);
    return { ram, cpu, totalIdr };
  }

  if (inputRam) inputRam.addEventListener('input', calculateResourceCost);
  if (inputCpu) inputCpu.addEventListener('input', calculateResourceCost);

  if (calcOrderBtn) {
    calcOrderBtn.addEventListener('click', () => {
      const res = calculateResourceCost();
      const msg = `Halo Admin FZ NX, saya ingin memesan konfigurasi custom:%0A- Tipe: ${APP_STATE.selectedCalcType.toUpperCase()}%0A- RAM: ${res.ram} GB%0A- CPU: ${res.cpu} Core%0A- Nilai: ${formatCurrency(res.totalIdr)}/bln`;
      window.open(`https://wa.me/6281234567890?text=${msg}`, '_blank');
    });
  }

  // Invoice Modal Management
  const invoiceModal = document.getElementById('invoice-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const invRef = document.getElementById('inv-ref');
  const invItem = document.getElementById('inv-item');
  const invSpecs = document.getElementById('inv-specs');
  const invTotal = document.getElementById('inv-total');
  const invWaBtn = document.getElementById('inv-wa-btn');
  const invCopyBtn = document.getElementById('inv-copy-btn');

  function openQuotation(item, specs, totalStr) {
    if (!invoiceModal) return;
    const ref = `FZNX-${Math.floor(1000 + Math.random() * 9000)}`;

    if (invRef) invRef.textContent = `REF: ${ref}`;
    if (invItem) invItem.textContent = item;
    if (invSpecs) invSpecs.textContent = specs;
    if (invTotal) invTotal.textContent = totalStr;

    if (invWaBtn) {
      invWaBtn.onclick = () => {
        const msg = `Halo Admin FZ NX, saya ingin mengonfirmasi Quotation resmi [${ref}]:%0A- Layanan: ${item}%0A- Spesifikasi: ${specs}%0A- Total: ${totalStr}`;
        window.open(`https://wa.me/6281234567890?text=${msg}`, '_blank');
      };
    }

    if (invCopyBtn) {
      invCopyBtn.onclick = () => {
        const text = `QUOTATION RESMI FZ NX\nRef: ${ref}\nItem: ${item}\nSpecs: ${specs}\nTotal: ${totalStr}\nGaransi SLA 99.98% & Proteksi DDoS`;
        navigator.clipboard.writeText(text);
        showToast("Ringkasan Quotation berhasil disalin!");
      };
    }

    invoiceModal.classList.add('open');
    invoiceModal.setAttribute('aria-hidden', 'false');
  }

  if (calcInvoiceBtn) {
    calcInvoiceBtn.addEventListener('click', () => {
      const res = calculateResourceCost();
      openQuotation(
        `Custom Server (${APP_STATE.selectedCalcType.toUpperCase()})`,
        `${res.ram} GB RAM, ${res.cpu} vCPU Core, Dedicated Port`,
        `${formatCurrency(res.totalIdr)}/bln`
      );
    });
  }

  document.querySelectorAll('.order-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.dataset.item;
      const price = parseInt(btn.dataset.price, 10);
      openQuotation(item, 'Alokasi resource standar garansi penuh', formatCurrency(price));
    });
  });

  if (modalCloseBtn && invoiceModal) {
    modalCloseBtn.addEventListener('click', () => {
      invoiceModal.classList.remove('open');
      invoiceModal.setAttribute('aria-hidden', 'true');
    });

    window.addEventListener('click', e => {
      if (e.target === invoiceModal) {
        invoiceModal.classList.remove('open');
        invoiceModal.setAttribute('aria-hidden', 'true');
      }
    });
  }

  /* --------------------------------------------------------------------------
     13. FAQ ACCORDION HANDLER
     -------------------------------------------------------------------------- */
  document.querySelectorAll('.faq-item').forEach(item => {
    item.addEventListener('click', () => {
      item.classList.toggle('active');
      const sign = item.querySelector('.faq-q span');
      if (sign) {
        sign.textContent = item.classList.contains('active') ? '−' : '+';
      }
    });
  });

  // Initial Calculation Run
  calculateResourceCost();
});
