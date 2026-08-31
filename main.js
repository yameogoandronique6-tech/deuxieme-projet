/**
 * KISWENDSIDA TECHNOLOGIE (KT) - Main Interactive Logic
 * Handles catalogue filtering, instant quote calculator, WhatsApp integration, mobile navigation, and interactive UI components.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Configuration
  const KT_CONFIG = {
    phone: "05484494",
    whatsappNumber: "22605484494", // Indicatif + Numéro
    email: "contact@kiswendsida-technologie.com",
    companyName: "KISWENDSIDA TECHNOLOGIE (KT)"
  };

  // 1. Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenuCloseBtn = document.getElementById('mobile-menu-close');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileMenuBtn && mobileMenu) {
    const toggleMenu = (open) => {
      if (open) {
        mobileMenu.classList.remove('hidden');
        setTimeout(() => {
          mobileMenu.classList.add('opacity-100');
          mobileMenu.querySelector('.mobile-menu-panel')?.classList.remove('translate-x-full');
        }, 10);
        document.body.style.overflow = 'hidden';
      } else {
        mobileMenu.querySelector('.mobile-menu-panel')?.classList.add('translate-x-full');
        mobileMenu.classList.remove('opacity-100');
        setTimeout(() => {
          mobileMenu.classList.add('hidden');
          document.body.style.overflow = '';
        }, 300);
      }
    };

    mobileMenuBtn.addEventListener('click', () => toggleMenu(true));
    if (mobileMenuCloseBtn) mobileMenuCloseBtn.addEventListener('click', () => toggleMenu(false));

    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => toggleMenu(false));
    });
  }

  // 2. Equipment Catalog Data & Filtering
  const catalogProducts = [
    {
      id: "pc-pro-dell",
      name: "Dell OptiPlex Pro 7000 Series",
      category: "ordinateurs",
      categoryLabel: "Ordinateurs & Postes Pro",
      specs: "Intel Core i7 13e Gén, 16 Go DDR5, 512 Go SSD NVMe, Écran 24\" FHD",
      badge: "Recommandé Entreprise",
      badgeColor: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      icon: "fa-desktop",
      warranty: "Garantie 2 ans constructeur",
      availability: "En Stock"
    },
    {
      id: "laptop-hp-elitebook",
      name: "HP EliteBook 840 G10 Pro",
      category: "ordinateurs",
      categoryLabel: "Ordinateurs & Postes Pro",
      specs: "Intel Core i5/i7, 16 Go RAM, 512 Go SSD, Châssis alu renforcé, Sécurité TPM 2.0",
      badge: "Mobilité & Performance",
      badgeColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
      icon: "fa-laptop",
      warranty: "Garantie 3 ans sur site",
      availability: "En Stock"
    },
    {
      id: "server-dell-poweredge",
      name: "Serveur Dell PowerEdge R450 Rack 1U",
      category: "serveurs",
      categoryLabel: "Serveurs & Baies de Brassage",
      specs: "Intel Xeon Silver 4314, 32 Go ECC RAM (ext. 1 To), 2x 480 Go SSD + 2x 2 To HDD SAS",
      badge: "Haute Disponibilité",
      badgeColor: "bg-amber-500/20 text-amber-400 border-amber-500/30",
      icon: "fa-server",
      warranty: "Garantie ProSupport 3 ans",
      availability: "Sur Commande & Config Sur Mesure"
    },
    {
      id: "rack-cabinet-42u",
      name: "Baie de Brassage 42U 800x1000 avec PDU & Gestion de Câbles",
      category: "serveurs",
      categoryLabel: "Serveurs & Baies de Brassage",
      specs: "Porte vitrée sécurisée, 4 ventilateurs intégrés, PDU 8 prises, étagères fixes",
      badge: "Infrastructure",
      badgeColor: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
      icon: "fa-cubes",
      warranty: "Certifié conforme aux normes TIA/EIA",
      availability: "En Stock"
    },
    {
      id: "switch-cisco-catalyst",
      name: "Switch Cisco Catalyst 24 Ports Gigabit PoE+ Managé",
      category: "reseau",
      categoryLabel: "Réseaux & Cybersécurité",
      specs: "24x 1GbE PoE+ (370W), 4x 10G SFP+ Uplinks, Layer 3 Routing, Sécurité avancée 802.1X",
      badge: "Réseau Entreprise",
      badgeColor: "bg-indigo-500/20 text-indigo-400 border-indigo-500/30",
      icon: "fa-network-wired",
      warranty: "Garantie à vie limitée Cisco",
      availability: "En Stock"
    },
    {
      id: "firewall-fortinet",
      name: "Pare-feu Fortinet FortiGate 60F UTM Next-Gen",
      category: "reseau",
      categoryLabel: "Réseaux & Cybersécurité",
      specs: "Débit Firewall 10 Gbps, VPN SSL/IPsec 900 Mbps, Inspection SSL, Antivirus & IPS intégrés",
      badge: "Cybersécurité Maximale",
      badgeColor: "bg-red-500/20 text-red-400 border-red-500/30",
      icon: "fa-shield-halved",
      warranty: "Licence FortiCare & FortiGuard incluses",
      availability: "En Stock"
    },
    {
      id: "ups-apc-smart",
      name: "Onduleur APC Smart-UPS 3000VA LCD 230V avec SmartConnect",
      category: "onduleurs",
      categoryLabel: "Onduleurs & Protection Électrique",
      specs: "Puissance 2700 Watts / 3000 VA, Onde sinusoïdale pure, Protection surtension & coupure",
      badge: "Protection Critique",
      badgeColor: "bg-purple-500/20 text-purple-400 border-purple-500/30",
      icon: "fa-bolt",
      warranty: "Garantie 3 ans (2 ans batterie)",
      availability: "En Stock"
    },
    {
      id: "printer-canon-laser",
      name: "Imprimante Multifonction Laser Couleur Canon Pro",
      category: "accessoires",
      categoryLabel: "Périphériques & Consommables",
      specs: "Impression recto-verso auto, Réseau Ethernet & Wi-Fi, 38 ppm, Scanner chargeur ADF 50 feuilles",
      badge: "Bureautique Pro",
      badgeColor: "bg-teal-500/20 text-teal-400 border-teal-500/30",
      icon: "fa-print",
      warranty: "Garantie 1 an + Contrat toners possible",
      availability: "En Stock"
    }
  ];

  const catalogGrid = document.getElementById('catalog-grid');
  const catalogTabs = document.querySelectorAll('.catalog-tab');
  const catalogSearch = document.getElementById('catalog-search');

  function renderCatalog(filterCategory = 'all', searchQuery = '') {
    if (!catalogGrid) return;

    const filtered = catalogProducts.filter(item => {
      const matchCategory = filterCategory === 'all' || item.category === filterCategory;
      const matchSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.specs.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });

    if (filtered.length === 0) {
      catalogGrid.innerHTML = `
        <div class="col-span-full py-16 text-center text-slate-400">
          <i class="fa-solid fa-box-open text-5xl mb-4 text-slate-600"></i>
          <p class="text-lg font-medium text-slate-300">Aucun équipement ne correspond à votre recherche.</p>
          <p class="text-sm text-slate-500 mt-1">Contactez-nous directement pour toute commande spécifique sur mesure.</p>
          <a href="https://wa.me/${KT_CONFIG.whatsappNumber}?text=Bonjour%20KISWENDSIDA%20TECHNOLOGIE,%20je%20recherche%20un%20%C3%A9quipement%20sp%C3%A9cifique%20non%20list%C3%A9." 
             target="_blank" 
             class="mt-4 inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-all shadow-lg shadow-emerald-600/20">
            <i class="fa-brands fa-whatsapp text-lg"></i> Demander sur WhatsApp
          </a>
        </div>
      `;
      return;
    }

    catalogGrid.innerHTML = filtered.map(item => `
      <div class="glass-card rounded-2xl p-6 flex flex-col justify-between group hover:border-sky-500/50 transition-all duration-300">
        <div>
          <div class="flex items-start justify-between gap-3 mb-4">
            <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-500/20 to-blue-600/10 border border-sky-500/30 flex items-center justify-center text-sky-400 text-xl group-hover:scale-110 transition-transform">
              <i class="fa-solid ${item.icon}"></i>
            </div>
            <span class="text-xs px-2.5 py-1 rounded-full border ${item.badgeColor} font-medium">
              ${item.badge}
            </span>
          </div>

          <span class="text-xs font-semibold uppercase tracking-wider text-sky-400/80 mb-1 block">${item.categoryLabel}</span>
          <h3 class="text-lg font-bold text-white group-hover:text-sky-300 transition-colors mb-2">${item.name}</h3>
          
          <p class="text-slate-400 text-xs leading-relaxed mb-4 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
            <i class="fa-solid fa-microchip text-sky-400 mr-1.5"></i> ${item.specs}
          </p>
        </div>

        <div class="pt-4 border-t border-slate-800/80 mt-2">
          <div class="flex items-center justify-between text-xs text-slate-400 mb-4">
            <span class="flex items-center gap-1.5 text-emerald-400">
              <i class="fa-solid fa-circle-check text-xs"></i> ${item.availability}
            </span>
            <span class="flex items-center gap-1">
              <i class="fa-solid fa-shield-check text-sky-400"></i> ${item.warranty}
            </span>
          </div>

          <div class="grid grid-cols-2 gap-2">
            <button onclick="window.requestQuoteForProduct('${item.name.replace(/'/g, "\\'")}')" 
                    class="w-full py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors border border-slate-700">
              <i class="fa-solid fa-file-invoice"></i> Devis
            </button>
            <a href="https://wa.me/${KT_CONFIG.whatsappNumber}?text=Bonjour%20KISWENDSIDA%20TECHNOLOGIE,%20je%20souhaite%20commander%20ou%20avoir%20le%20prix%20pour%20:%20*${encodeURIComponent(item.name)}*." 
               target="_blank" 
               class="w-full py-2.5 px-3 rounded-xl bg-emerald-600/90 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-md shadow-emerald-600/20">
              <i class="fa-brands fa-whatsapp text-sm"></i> Commander
            </a>
          </div>
        </div>
      </div>
    `).join('');
  }

  // Initialize catalog
  renderCatalog();

  // Tab Filtering Event
  catalogTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      catalogTabs.forEach(t => t.classList.remove('active', 'bg-sky-500', 'text-white'));
      tab.classList.add('active');
      const category = tab.getAttribute('data-category');
      const query = catalogSearch ? catalogSearch.value : '';
      renderCatalog(category, query);
    });
  });

  // Search Filtering Event
  if (catalogSearch) {
    catalogSearch.addEventListener('input', (e) => {
      const activeTab = document.querySelector('.catalog-tab.active');
      const category = activeTab ? activeTab.getAttribute('data-category') : 'all';
      renderCatalog(category, e.target.value);
    });
  }

  // 3. Interactive Instant Quote Simulator (Simulateur de Devis)
  const serviceTypeSelect = document.getElementById('sim-service-type');
  const parkSizeSelect = document.getElementById('sim-park-size');
  const optSupport247 = document.getElementById('sim-opt-247');
  const optCloudBackup = document.getElementById('sim-opt-cloud');
  const optSecurityAudit = document.getElementById('sim-opt-security');
  const simResultService = document.getElementById('sim-result-service');
  const simResultScope = document.getElementById('sim-result-scope');
  const simResultOptions = document.getElementById('sim-result-options');
  const simWhatsappBtn = document.getElementById('sim-whatsapp-btn');
  const simEmailBtn = document.getElementById('sim-email-btn');

  function updateQuoteSimulation() {
    if (!serviceTypeSelect || !parkSizeSelect) return;

    const serviceName = serviceTypeSelect.options[serviceTypeSelect.selectedIndex]?.text || "Non spécifié";
    const parkScope = parkSizeSelect.options[parkSizeSelect.selectedIndex]?.text || "Non spécifié";
    
    const selectedOptions = [];
    if (optSupport247?.checked) selectedOptions.push("Support Prioritaire 24/7");
    if (optCloudBackup?.checked) selectedOptions.push("Sauvegarde Cloud & PRA");
    if (optSecurityAudit?.checked) selectedOptions.push("Audit Cybersécurité Inclus");

    if (simResultService) simResultService.textContent = serviceName;
    if (simResultScope) simResultScope.textContent = parkScope;
    if (simResultOptions) {
      simResultOptions.textContent = selectedOptions.length > 0 ? selectedOptions.join(', ') : "Options de base standards";
    }

    // Build WhatsApp message
    const optionsText = selectedOptions.length > 0 ? selectedOptions.join(', ') : "Aucune option additionnelle";
    const msg = `*DEMANDE DE DEVIS EN LIGNE - KISWENDSIDA TECHNOLOGIE (KT)*\n\n` +
                `📌 *Service souhaité* : ${serviceName}\n` +
                `🏢 *Taille de l'infrastructure* : ${parkScope}\n` +
                `⚙️ *Options sélectionnées* : ${optionsText}\n` +
                `📞 *Contact direct client* : [Veuillez préciser votre nom et entreprise]\n\n` +
                `Merci de me faire parvenir une proposition technique et tarifaire.`;

    if (simWhatsappBtn) {
      simWhatsappBtn.href = `https://wa.me/${KT_CONFIG.whatsappNumber}?text=${encodeURIComponent(msg)}`;
    }

    if (simEmailBtn) {
      simEmailBtn.href = `mailto:${KT_CONFIG.email}?subject=${encodeURIComponent("Demande de Devis - " + serviceName)}&body=${encodeURIComponent(msg)}`;
    }
  }

  // Attach change listeners to simulator
  [serviceTypeSelect, parkSizeSelect, optSupport247, optCloudBackup, optSecurityAudit].forEach(elem => {
    if (elem) elem.addEventListener('change', updateQuoteSimulation);
  });
  updateQuoteSimulation();

  // Helper to open simulator from products
  window.requestQuoteForProduct = function(productName) {
    if (serviceTypeSelect) {
      serviceTypeSelect.value = "vente-equipements";
      updateQuoteSimulation();
    }
    const simSection = document.getElementById('simulateur-devis');
    if (simSection) {
      simSection.scrollIntoView({ behavior: 'smooth' });
    }
    showToast(`Simulation prête pour "${productName}". Personnalisez vos options ci-dessous.`);
  };

  // Helper to trigger quote for specific service
  window.requestQuoteForService = function(serviceVal) {
    if (serviceTypeSelect) {
      serviceTypeSelect.value = serviceVal;
      updateQuoteSimulation();
    }
    const simSection = document.getElementById('simulateur-devis');
    if (simSection) {
      simSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // 4. Contact Form Handler
  const contactForm = document.getElementById('kt-contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contact-name')?.value || '';
      const phone = document.getElementById('contact-phone')?.value || '';
      const email = document.getElementById('contact-email')?.value || '';
      const service = document.getElementById('contact-service')?.value || '';
      const message = document.getElementById('contact-message')?.value || '';

      const fullMessage = `*NOUVEAU MESSAGE VIA LE SITE WEB (KT)*\n\n` +
                          `👤 *Nom* : ${name}\n` +
                          `📱 *Téléphone* : ${phone}\n` +
                          `✉️ *Email* : ${email}\n` +
                          `🎯 *Service concerné* : ${service}\n` +
                          `💬 *Message* :\n${message}`;

      // Open WhatsApp with pre-filled message or show confirmation
      window.open(`https://wa.me/${KT_CONFIG.whatsappNumber}?text=${encodeURIComponent(fullMessage)}`, '_blank');
      
      showToast('Votre message a été transmis avec succès ! Notre équipe technique vous répond sous peu.', 'success');
      contactForm.reset();
    });
  }

  // 5. FAQ Accordion Logic
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const header = item.querySelector('.faq-header');
    if (header) {
      header.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        faqItems.forEach(i => i.classList.remove('active'));
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });

  // 6. Toast Notification Helper
  function showToast(message, type = 'info') {
    let toast = document.getElementById('toast-notification');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toast-notification';
      toast.className = 'fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3.5 rounded-xl shadow-2xl flex items-center gap-3 text-sm font-medium border text-white backdrop-blur-lg';
      document.body.appendChild(toast);
    }

    if (type === 'success') {
      toast.className = 'fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3.5 rounded-xl shadow-2xl flex items-center gap-3 text-sm font-medium border text-white backdrop-blur-lg bg-emerald-950/90 border-emerald-500/50 shadow-emerald-500/20';
      toast.innerHTML = `<i class="fa-solid fa-circle-check text-emerald-400 text-lg"></i> <span>${message}</span>`;
    } else {
      toast.className = 'fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3.5 rounded-xl shadow-2xl flex items-center gap-3 text-sm font-medium border text-white backdrop-blur-lg bg-slate-900/90 border-sky-500/50 shadow-sky-500/20';
      toast.innerHTML = `<i class="fa-solid fa-circle-info text-sky-400 text-lg"></i> <span>${message}</span>`;
    }

    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 4000);
  }

  window.showToast = showToast;

  // 7. Navbar Scroll Background Adjustment
  const navbar = document.getElementById('main-navbar');
  window.addEventListener('scroll', () => {
    if (navbar) {
      if (window.scrollY > 40) {
        navbar.classList.add('shadow-xl', 'bg-slate-950/95', 'border-b', 'border-slate-800');
      } else {
        navbar.classList.remove('shadow-xl', 'bg-slate-950/95');
      }
    }
  });

  // 8. Dynamic Year in Footer
  const yearElem = document.getElementById('current-year');
  if (yearElem) {
    yearElem.textContent = new Date().getFullYear();
  }
});
