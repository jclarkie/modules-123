/**
 * SneakerPapi — Store Management & POS System
 * dashboard.js
 * 
 * Note: Predefined Array functions (e.g. Array.prototype.find, filter, map,
 * reduce, findIndex, some, every, push, pop, unshift, splice, join, forEach)
 * have been rewritten into raw implementations.
 */

// ==========================================
// RAW ARRAY IMPLEMENTATIONS & UTILITIES
// ==========================================

function rawFind(arr, predicate) {
  if (!arr) return undefined;
  for (let i = 0; i < arr.length; i++) {
    if (predicate(arr[i], i, arr)) {
      return arr[i];
    }
  }
  return undefined;
}

function rawFindIndex(arr, predicate) {
  if (!arr) return -1;
  for (let i = 0; i < arr.length; i++) {
    if (predicate(arr[i], i, arr)) {
      return i;
    }
  }
  return -1;
}

function rawFilter(arr, predicate) {
  const result = [];
  if (!arr) return result;
  for (let i = 0; i < arr.length; i++) {
    if (predicate(arr[i], i, arr)) {
      result[result.length] = arr[i];
    }
  }
  return result;
}

function rawMap(arr, transform) {
  const result = [];
  if (!arr) return result;
  for (let i = 0; i < arr.length; i++) {
    result[result.length] = transform(arr[i], i, arr);
  }
  return result;
}

function rawReduce(arr, callback, initialValue) {
  if (!arr || arr.length === 0) {
    if (initialValue !== undefined) return initialValue;
    throw new TypeError("Reduce of empty array with no initial value");
  }
  let accumulator = initialValue !== undefined ? initialValue : arr[0];
  let startIndex = initialValue !== undefined ? 0 : 1;
  for (let i = startIndex; i < arr.length; i++) {
    accumulator = callback(accumulator, arr[i], i, arr);
  }
  return accumulator;
}

function rawSome(arr, predicate) {
  if (!arr) return false;
  for (let i = 0; i < arr.length; i++) {
    if (predicate(arr[i], i, arr)) {
      return true;
    }
  }
  return false;
}

function rawEvery(arr, predicate) {
  if (!arr) return true;
  for (let i = 0; i < arr.length; i++) {
    if (!predicate(arr[i], i, arr)) {
      return false;
    }
  }
  return true;
}

function rawPush(arr, item) {
  arr[arr.length] = item;
  return arr.length;
}

function rawUnshift(arr, item) {
  for (let i = arr.length; i > 0; i--) {
    arr[i] = arr[i - 1];
  }
  arr[0] = item;
  return arr.length;
}

function rawPop(arr) {
  if (!arr || arr.length === 0) return undefined;
  const lastIndex = arr.length - 1;
  const lastItem = arr[lastIndex];
  arr.length = lastIndex;
  return lastItem;
}

function rawShift(arr) {
  if (!arr || arr.length === 0) return undefined;
  const firstItem = arr[0];
  for (let i = 0; i < arr.length - 1; i++) {
    arr[i] = arr[i + 1];
  }
  arr.length = arr.length - 1;
  return firstItem;
}

function rawSplice(arr, start, deleteCount) {
  if (!arr || start < 0 || start >= arr.length) return [];
  const removed = [];
  const count = (deleteCount === undefined) ? (arr.length - start) : Math.min(deleteCount, arr.length - start);
  for (let i = 0; i < count; i++) {
    removed[removed.length] = arr[start + i];
  }
  for (let i = start; i < arr.length - count; i++) {
    arr[i] = arr[i + count];
  }
  arr.length = arr.length - count;
  return removed;
}

function rawJoin(arr, separator = ",") {
  if (!arr || arr.length === 0) return "";
  let result = "";
  for (let i = 0; i < arr.length; i++) {
    if (i > 0) result += separator;
    if (arr[i] !== null && arr[i] !== undefined) {
      result += arr[i];
    }
  }
  return result;
}

function rawForEach(list, callback) {
  if (!list) return;
  for (let i = 0; i < list.length; i++) {
    callback(list[i], i, list);
  }
}

// ==========================================
// DEFAULT SEED DATA
// ==========================================
const DEFAULT_INVENTORY = [
  {
    id: "PROD-101",
    code: "NK-DNK-PND",
    name: "Nike Dunk Low Retro 'Panda'",
    category: "Shoes",
    categoryPath: "Footwear > Sneakers",
    size: "42 EU (8.5 US)",
    color: "Black / White",
    basePrice: 6500,
    authenticity: "Authentic",
    stock: 8,
    reserved: 1,
    damaged: 0,
    reorderLevel: 3
  },
  {
    id: "PROD-102",
    code: "AJ-4-BCAT",
    name: "Air Jordan 4 Retro 'Black Cat'",
    category: "Shoes",
    categoryPath: "Footwear > Basketball",
    size: "44 EU (10 US)",
    color: "Triple Black",
    basePrice: 2100,
    authenticity: "Class A",
    stock: 14,
    reserved: 2,
    damaged: 1,
    reorderLevel: 4
  },
  {
    id: "PROD-103",
    code: "CR-CLG-WHT",
    name: "Crocs Classic Clog",
    category: "Crocs & Sandals",
    categoryPath: "Footwear > Crocs & Sandals",
    size: "38 EU (M6/W8)",
    color: "Pure White",
    basePrice: 2500,
    authenticity: "Authentic",
    stock: 12,
    reserved: 1,
    damaged: 0,
    reorderLevel: 5
  },
  {
    id: "PROD-104",
    code: "CR-PLX-BGE",
    name: "Crocs x Salehe Bembury Pollex Clog",
    category: "Crocs & Sandals",
    categoryPath: "Footwear > Crocs & Sandals",
    size: "41 EU (M8/W10)",
    color: "Crocodile Tan",
    basePrice: 1900,
    authenticity: "Class A",
    stock: 7,
    reserved: 0,
    damaged: 0,
    reorderLevel: 3
  },
  {
    id: "PROD-105",
    code: "NK-AF1-07",
    name: "Nike Air Force 1 '07 Low",
    category: "Shoes",
    categoryPath: "Footwear > Lifestyle",
    size: "40 EU (7 US)",
    color: "Triple White",
    basePrice: 2100,
    authenticity: "Class A",
    stock: 18,
    reserved: 1,
    damaged: 0,
    reorderLevel: 5
  },
  {
    id: "PROD-106",
    code: "TP-XB-BLK",
    name: "Trapstar T-Crossbody Utility Bag",
    category: "Bags",
    categoryPath: "Accessories > Streetwear Bags",
    size: "One Size",
    color: "Black / Reflective",
    basePrice: 1400,
    authenticity: "Class A",
    stock: 9,
    reserved: 0,
    damaged: 0,
    reorderLevel: 3
  },
  {
    id: "PROD-107",
    code: "ST-8B-TEE",
    name: "Stussy 8-Ball Heavyweight Tee",
    category: "T-Shirts",
    categoryPath: "Apparel > Graphic Tees",
    size: "Large (Oversized)",
    color: "Vintage Washed Black",
    basePrice: 850,
    authenticity: "Class A",
    stock: 15,
    reserved: 0,
    damaged: 0,
    reorderLevel: 5
  },
  {
    id: "PROD-108",
    code: "SP-WB-JKT",
    name: "SneakerPapi Tech Windbreaker",
    category: "Jackets",
    categoryPath: "Apparel > Outerwear",
    size: "XL",
    color: "Matte Black / Red Accent",
    basePrice: 1800,
    authenticity: "Authentic",
    stock: 6,
    reserved: 0,
    damaged: 1,
    reorderLevel: 2
  },
  {
    id: "PROD-109",
    code: "YZ-350-ZBR",
    name: "Adidas Yeezy Boost 350 V2 'Zebra'",
    category: "Shoes",
    categoryPath: "Footwear > Sneakers",
    size: "43 EU (9.5 US)",
    color: "White / Core Black / Red",
    basePrice: 2100,
    authenticity: "Class A",
    stock: 2,
    reserved: 1,
    damaged: 0,
    reorderLevel: 4
  }
];

const DEFAULT_ORDERS = [
  {
    id: "ORD-9021",
    customerName: "Mark Vincent Ramos",
    phone: "0917-555-1234",
    address: "Unit 402 Acacia Estates, Taguig City, Metro Manila",
    courier: "J&T Express",
    trackingNumber: "JNT-PH-982341",
    productId: "PROD-101",
    productName: "Nike Dunk Low Retro 'Panda'",
    sku: "NK-DNK-PND",
    size: "42 EU",
    itemPrice: 6500,
    downpayment: 2000,
    balance: 4500,
    status: "Reserved",
    date: "2026-09-18 14:30",
    notes: "Downpayment verified via GCash. Awaiting remaining COD upon J&T delivery."
  },
  {
    id: "ORD-9022",
    customerName: "Sarah Jane Cruz",
    phone: "0920-888-9901",
    address: "Block 12 Lot 5, San Lorenzo Village, Makati City",
    courier: "J&T Express",
    trackingNumber: "JNT-PH-771290",
    productId: "PROD-103",
    productName: "Crocs Classic Clog Pure White",
    sku: "CR-CLG-WHT",
    size: "38 EU",
    itemPrice: 2500,
    downpayment: 2500,
    balance: 0,
    status: "In-Transit",
    date: "2026-09-17 11:15",
    notes: "Full payment confirmed. Picked up by J&T courier."
  },
  {
    id: "ORD-9023",
    customerName: "Dave Bautista",
    phone: "0908-123-4567",
    address: "24 Katipunan Ave, Quezon City, Metro Manila",
    courier: "J&T Express",
    trackingNumber: "JNT-PH-654321",
    productId: "PROD-102",
    productName: "Air Jordan 4 Retro 'Black Cat'",
    sku: "AJ-4-BCAT",
    size: "44 EU",
    itemPrice: 2100,
    downpayment: 2100,
    balance: 0,
    status: "Delivered",
    date: "2026-09-16 09:40",
    notes: "Customer confirmed parcel received via FB messenger inquiry."
  },
  {
    id: "ORD-9024",
    customerName: "Christian Kyle Santos",
    phone: "0915-999-4433",
    address: "15 Rizal St., Poblacion, Malolos, Bulacan",
    courier: "J&T Express",
    trackingNumber: "JNT-PH-334411",
    productId: "PROD-105",
    productName: "Nike Air Force 1 '07 Low",
    sku: "NK-AF1-07",
    size: "40 EU",
    itemPrice: 2100,
    downpayment: 1000,
    balance: 1100,
    status: "To Ship",
    date: "2026-09-19 10:20",
    notes: "Downpayment received. Box bubble-wrapped, ready for courier pickup."
  }
];

const DEFAULT_DAMAGED = [
  {
    id: "DMG-01",
    productId: "PROD-102",
    productName: "Air Jordan 4 Retro 'Black Cat'",
    sku: "AJ-4-BCAT",
    size: "44 EU",
    quantity: 1,
    defectDescription: "Heel sole separation & glue stain upon batch unboxing",
    status: "Pending Supplier Return",
    reportedBy: "Staff (John)",
    date: "2026-09-18 16:00"
  },
  {
    id: "DMG-02",
    productId: "PROD-108",
    productName: "SneakerPapi Tech Windbreaker",
    sku: "SP-WB-JKT",
    size: "XL",
    quantity: 1,
    defectDescription: "Defective zipper slider, teeth jammed",
    status: "Replacement Received",
    reportedBy: "Admin 1",
    date: "2026-09-15 13:20"
  }
];

const DEFAULT_LOGS = [
  {
    id: "LOG-01",
    timestamp: "2026-09-19 17:45",
    actor: "Admin 1",
    tag: "SYSTEM",
    tagClass: "pill-info",
    message: "SneakerPapi System synchronized. Loaded store inventory & J&T Express queues."
  },
  {
    id: "LOG-02",
    timestamp: "2026-09-19 16:30",
    actor: "Staff / Admin 2",
    tag: "POS SALE",
    tagClass: "pill-success",
    message: "Walk-in sale completed: 2x Shoes with Promo 2 (B1T1 Bundle ₱3,200). Stock deducted."
  },
  {
    id: "LOG-03",
    timestamp: "2026-09-19 14:10",
    actor: "Admin 1",
    tag: "ONLINE ORDER",
    tagClass: "pill-warning",
    message: "New Online Order #ORD-9024 marked as Reserved (Downpayment ₱1,000). Stock reserved."
  },
  {
    id: "LOG-04",
    timestamp: "2026-09-19 11:20",
    actor: "Staff (John)",
    tag: "SHIPPING",
    tagClass: "pill-info",
    message: "Order #ORD-9022 dispatched to J&T Express (Tracking: JNT-PH-771290)."
  }
];

// ==========================================
// APPLICATION STATE
// ==========================================
let appState = {
  role: "Admin 1",
  inventory: [],
  orders: [],
  damaged: [],
  logs: [],
  cart: [],
  activePromo: "none",
  todayWalkInSales: 6400,
  todayOnlineSales: 9000
};

// ==========================================
// STORAGE CONTROLLER
// ==========================================
function loadState() {
  try {
    const savedRole = localStorage.getItem("sp_role");
    const loggedInUser = localStorage.getItem("sp_current_user");
    const savedInventory = localStorage.getItem("sp_inventory");
    const savedOrders = localStorage.getItem("sp_orders");
    const savedDamaged = localStorage.getItem("sp_damaged");
    const savedLogs = localStorage.getItem("sp_logs");
    const savedWalkInSales = localStorage.getItem("sp_walkin_sales");
    const savedOnlineSales = localStorage.getItem("sp_online_sales");

    if (loggedInUser) {
      appState.role = loggedInUser;
    } else if (savedRole) {
      appState.role = savedRole;
    }

    appState.inventory = savedInventory ? JSON.parse(savedInventory) : DEFAULT_INVENTORY;
    appState.orders = savedOrders ? JSON.parse(savedOrders) : DEFAULT_ORDERS;
    appState.damaged = savedDamaged ? JSON.parse(savedDamaged) : DEFAULT_DAMAGED;
    appState.logs = savedLogs ? JSON.parse(savedLogs) : DEFAULT_LOGS;
    if (savedWalkInSales) appState.todayWalkInSales = parseFloat(savedWalkInSales);
    if (savedOnlineSales) appState.todayOnlineSales = parseFloat(savedOnlineSales);
  } catch (e) {
    console.error("Failed to parse localStorage, resetting to defaults", e);
    resetToDefaults();
  }
}

function saveState() {
  localStorage.setItem("sp_role", appState.role);
  localStorage.setItem("sp_current_user", appState.role);
  localStorage.setItem("sp_inventory", JSON.stringify(appState.inventory));
  localStorage.setItem("sp_orders", JSON.stringify(appState.orders));
  localStorage.setItem("sp_damaged", JSON.stringify(appState.damaged));
  localStorage.setItem("sp_logs", JSON.stringify(appState.logs));
  localStorage.setItem("sp_walkin_sales", String(appState.todayWalkInSales));
  localStorage.setItem("sp_online_sales", String(appState.todayOnlineSales));
}

function resetToDefaults() {
  appState.inventory = JSON.parse(JSON.stringify(DEFAULT_INVENTORY));
  appState.orders = JSON.parse(JSON.stringify(DEFAULT_ORDERS));
  appState.damaged = JSON.parse(JSON.stringify(DEFAULT_DAMAGED));
  appState.logs = JSON.parse(JSON.stringify(DEFAULT_LOGS));
  appState.todayWalkInSales = 6400;
  appState.todayOnlineSales = 9000;
  appState.cart = [];
  appState.activePromo = "none";
  saveState();
  renderAll();
  showToast("System reset to default store data.");
}

// ==========================================
// TOAST & LOGGING HELPERS
// ==========================================
function showToast(message, type = "normal") {
  const container = document.getElementById("toastContainer");
  if (!container) return;
  const toast = document.createElement("div");
  toast.className = "toast";
  if (type === "error") toast.style.borderLeftColor = "var(--sp-red)";
  if (type === "success") toast.style.borderLeftColor = "var(--sp-success)";

  toast.innerHTML = `<span>⚡</span><span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(50px)";
    toast.style.transition = "all 0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

function addAuditLog(tag, tagClass, message) {
  const now = new Date();
  const timeStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  const newLog = {
    id: "LOG-" + Date.now(),
    timestamp: timeStr,
    actor: appState.role,
    tag: tag,
    tagClass: tagClass,
    message: message
  };
  rawUnshift(appState.logs, newLog);
  if (appState.logs.length > 50) {
    rawPop(appState.logs);
  }
  saveState();
  renderLogs();
}

// ==========================================
// LOG OUT CONTROLLER
// ==========================================
function logoutUser() {
  localStorage.removeItem("sp_current_user");
  showToast("Logged out successfully. Redirecting...", "success");
  setTimeout(() => {
    window.location.href = "module_1/login.html";
  }, 800);
}

function renderRoleUI() {
  const badge = document.getElementById("currentRoleBadge");
  const roleNotice = document.getElementById("staffRoleNotice");

  let isAdmin = appState.role.toLowerCase().includes("admin");
  let roleName = appState.role;

  try {
    const storedUsers = localStorage.getItem("sp_users");
    if (storedUsers) {
      const users = JSON.parse(storedUsers);
      const currentUserObj = rawFind(users, u => (u.username === appState.role || u.name === appState.role || u.email === appState.role));
      if (currentUserObj) {
        if (currentUserObj.roleName) roleName = currentUserObj.roleName;
        if (currentUserObj.role) {
          isAdmin = currentUserObj.role.toLowerCase().includes("admin");
        }
      }
    }
  } catch (e) {
    console.error("Error reading user permissions", e);
  }

  console.log(roleName);
  if (badge) {
    badge.textContent = roleName;
    badge.className = "role-badge " + (isAdmin ? "admin" : "staff");
  }

  // Restrict Admin-only buttons
  const adminOnlyBtns = document.querySelectorAll(".admin-only");
  rawForEach(adminOnlyBtns, btn => {
    btn.disabled = !isAdmin;
    if (!isAdmin) {
      btn.title = "Action restricted: Admin permission required";
    } else {
      btn.title = "";
    }
  });

  if (roleNotice) {
    roleNotice.style.display = isAdmin ? "none" : "block";
  }
}

// ==========================================
// KPI CALCULATIONS & RENDERING
// ==========================================
function renderKPIs() {
  const totalRev = appState.todayWalkInSales + appState.todayOnlineSales;
  document.getElementById("kpiTotalSales").textContent = "₱" + totalRev.toLocaleString("en-PH", { minimumFractionDigits: 2 });
  document.getElementById("kpiSalesSplit").textContent = `Walk-in: ₱${appState.todayWalkInSales.toLocaleString()} | Online: ₱${appState.todayOnlineSales.toLocaleString()}`;

  const totalStock = rawReduce(appState.inventory, (sum, item) => sum + item.stock, 0);
  const lowStockCount = rawFilter(appState.inventory, item => item.stock <= item.reorderLevel).length;
  document.getElementById("kpiTotalStock").textContent = totalStock + " Units";
  document.getElementById("kpiLowStockAlert").textContent = `${lowStockCount} items at/below reorder level`;

  const reservedTotal = rawReduce(appState.inventory, (sum, item) => sum + (item.reserved || 0), 0);
  const reservedOrdersCount = rawFilter(appState.orders, o => o.status === "Reserved").length;
  document.getElementById("kpiReservedStock").textContent = reservedTotal + " Pairs";
  document.getElementById("kpiReservedSub").textContent = `${reservedOrdersCount} Pending Downpayment Orders`;

  const toShipCount = rawFilter(appState.orders, o => o.status === "To Ship").length;
  const inTransitCount = rawFilter(appState.orders, o => o.status === "In-Transit").length;
  document.getElementById("kpiJntQueue").textContent = (toShipCount + inTransitCount) + " Parcels";
  document.getElementById("kpiJntSub").textContent = `${toShipCount} To Ship | ${inTransitCount} In-Transit`;

  const totalDamaged = rawReduce(appState.inventory, (sum, item) => sum + (item.damaged || 0), 0);
  document.getElementById("kpiDamaged").textContent = totalDamaged + " Defective";
  document.getElementById("kpiDamagedSub").textContent = "To return to supplier for replacement";
}

// ==========================================
// WALK-IN POS TERMINAL
// ==========================================
function setPromo(promoType) {
  if (appState.activePromo === promoType) {
    appState.activePromo = "none";
  } else {
    appState.activePromo = promoType;
  }
  renderPOS();
}

function addToCart(productId) {
  const product = rawFind(appState.inventory, p => p.id === productId);
  if (!product) return;

  if (product.stock <= 0) {
    showToast(`Out of Stock! Cannot sell '${product.name}'.`, "error");
    return;
  }

  const cartItem = rawFind(appState.cart, c => c.productId === productId);
  if (cartItem) {
    if (cartItem.qty + 1 > product.stock) {
      showToast(`Cannot exceed current available stock (${product.stock} units).`, "error");
      return;
    }
    cartItem.qty++;
  } else {
    rawPush(appState.cart, {
      productId: product.id,
      code: product.code,
      name: product.name,
      size: product.size,
      unitPrice: product.basePrice,
      qty: 1
    });
  }

  renderPOS();
}

function updateCartQty(productId, delta) {
  const cartIndex = rawFindIndex(appState.cart, c => c.productId === productId);
  if (cartIndex === -1) return;

  const product = rawFind(appState.inventory, p => p.id === productId);
  const item = appState.cart[cartIndex];

  if (delta > 0 && product && item.qty + 1 > product.stock) {
    showToast(`Cannot exceed current available stock (${product.stock} units).`, "error");
    return;
  }

  item.qty += delta;
  if (item.qty <= 0) {
    rawSplice(appState.cart, cartIndex, 1);
  }
  renderPOS();
}

function clearCart() {
  appState.cart = [];
  appState.activePromo = "none";
  renderPOS();
}

function calculatePOSCart() {
  const totalItems = rawReduce(appState.cart, (s, i) => s + i.qty, 0);
  const subtotal = rawReduce(appState.cart, (s, i) => s + (i.unitPrice * i.qty), 0);
  let discount = 0;
  let promoDescription = "No Promo Applied";

  if (appState.activePromo === "promo1") {
    discount = totalItems * 200;
    promoDescription = `Promo 1 (Solo Discount: -₱200/item)`;
  } else if (appState.activePromo === "promo2") {
    const bundlePairs = Math.floor(totalItems / 2);
    if (bundlePairs > 0) {
      let bundleNormalSum = 0;
      let itemsCounted = 0;
      for (let i = 0; i < appState.cart.length; i++) {
        const item = appState.cart[i];
        for (let k = 0; k < item.qty; k++) {
          if (itemsCounted < bundlePairs * 2) {
            bundleNormalSum += item.unitPrice;
            itemsCounted++;
          }
        }
      }
      const bundlePromoTotal = bundlePairs * 3200;
      discount = Math.max(0, bundleNormalSum - bundlePromoTotal);
      promoDescription = `Promo 2: Buy 1 Take 1 Bundle (${bundlePairs} pair bundle @ ₱3,200)`;
    } else {
      promoDescription = `Promo 2: Add at least 2 items to trigger B1T1 ₱3,200 bundle!`;
    }
  } else if (appState.activePromo === "promo3") {
    discount = subtotal * 0.15;
    promoDescription = "Promo 3: Student Promo (15% Off Total Cart)";
  }

  const finalTotal = Math.max(0, subtotal - discount);
  return { totalItems, subtotal, discount, finalTotal, promoDescription };
}

function renderPOS() {
  const grid = document.getElementById("posProductGrid");
  const searchInput = document.getElementById("posSearchInput");
  const categoryFilter = document.getElementById("posCategoryFilter");

  const searchQuery = (searchInput ? searchInput.value : "").toLowerCase();
  const selectedCategory = categoryFilter ? categoryFilter.value : "All";

  const filtered = rawFilter(appState.inventory, item => {
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery) ||
      item.code.toLowerCase().includes(searchQuery) ||
      item.color.toLowerCase().includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  if (grid) {
    grid.innerHTML = rawJoin(rawMap(filtered, item => {
      const isOutOfStock = item.stock <= 0;
      return `
        <div class="pos-card ${isOutOfStock ? 'out-of-stock' : ''}" onclick="${isOutOfStock ? '' : `addToCart('${item.id}')`}">
            <div>
                <div class="pos-card-sku">${item.code}</div>
                <div class="pos-card-name">${item.name}</div>
                <div class="pos-card-meta">${item.size} • ${item.color}</div>
                <span class="badge ${item.authenticity === 'Authentic' ? 'badge-authentic' : 'badge-replica'}">${item.authenticity}</span>
            </div>
            <div class="pos-card-bottom">
                <div class="pos-card-price">₱${item.basePrice.toLocaleString()}</div>
                <div class="pos-card-stock ${item.stock <= item.reorderLevel ? 'pill-warning' : ''}">
                    ${isOutOfStock ? 'OUT OF STOCK' : `${item.stock} in stock`}
                </div>
            </div>
        </div>
      `;
    }), "");
  }

  rawForEach(document.querySelectorAll(".promo-btn"), btn => {
    const promo = btn.getAttribute("data-promo");
    if (promo === appState.activePromo) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });

  const cartContainer = document.getElementById("cartItemsContainer");
  if (cartContainer) {
    if (appState.cart.length === 0) {
      cartContainer.innerHTML = `<div style="text-align: center; color: var(--sp-muted); padding: 40px 10px; font-size: 13px;">
                🛒 Cart is empty.<br>Click any product from the catalog to add.
            </div>`;
    } else {
      cartContainer.innerHTML = rawJoin(rawMap(appState.cart, item => `
          <div class="cart-item">
              <div class="cart-item-info">
                  <div class="cart-item-name">${item.name}</div>
                  <div class="cart-item-meta">${item.code} • ${item.size} • ₱${item.unitPrice.toLocaleString()}</div>
              </div>
              <div class="cart-qty-ctrl">
                  <button class="qty-btn" onclick="updateCartQty('${item.productId}', -1)">-</button>
                  <span style="font-weight: 700; font-size: 14px; min-width: 18px; text-align: center;">${item.qty}</span>
                  <button class="qty-btn" onclick="updateCartQty('${item.productId}', 1)">+</button>
              </div>
              <div class="cart-item-price">₱${(item.unitPrice * item.qty).toLocaleString()}</div>
          </div>
      `), "");
    }
  }

  const { totalItems, subtotal, discount, finalTotal, promoDescription } = calculatePOSCart();

  const subtotalEl = document.getElementById("posCartSubtotal");
  const discountEl = document.getElementById("posCartDiscount");
  const discountRow = document.getElementById("posDiscountRow");
  const totalEl = document.getElementById("posCartTotal");
  const countEl = document.getElementById("posCartItemCount");
  const descEl = document.getElementById("posPromoDesc");

  if (subtotalEl) subtotalEl.textContent = "₱" + subtotal.toLocaleString("en-PH", { minimumFractionDigits: 2 });
  if (discountEl) discountEl.textContent = "-₱" + discount.toLocaleString("en-PH", { minimumFractionDigits: 2 });
  if (totalEl) totalEl.textContent = "₱" + finalTotal.toLocaleString("en-PH", { minimumFractionDigits: 2 });
  if (countEl) countEl.textContent = `${totalItems} items`;
  if (descEl) descEl.textContent = promoDescription;
  if (discountRow) discountRow.style.display = discount > 0 ? "flex" : "none";

  calculateChange();
}

function calculateChange() {
  const { finalTotal } = calculatePOSCart();
  const cashInput = document.getElementById("posCashTendered");
  const changeEl = document.getElementById("posChangeAmount");
  const checkoutBtn = document.getElementById("posCheckoutBtn");

  const cash = parseFloat(cashInput ? cashInput.value : 0) || 0;
  const change = Math.max(0, cash - finalTotal);

  if (changeEl) {
    changeEl.textContent = "₱" + change.toLocaleString("en-PH", { minimumFractionDigits: 2 });
    changeEl.style.color = cash >= finalTotal && finalTotal > 0 ? "var(--sp-success)" : "var(--sp-black)";
  }

  if (checkoutBtn) {
    checkoutBtn.disabled = appState.cart.length === 0 || (cash > 0 && cash < finalTotal);
  }
}

function completeWalkInSale() {
  if (appState.cart.length === 0) {
    showToast("Cart is empty!", "error");
    return;
  }

  const { finalTotal, promoDescription } = calculatePOSCart();
  const cashInput = document.getElementById("posCashTendered");
  const cash = parseFloat(cashInput ? cashInput.value : 0) || finalTotal;

  if (cash < finalTotal) {
    showToast("Cash tendered is less than the total amount!", "error");
    return;
  }

  const itemSummary = [];
  for (let i = 0; i < appState.cart.length; i++) {
    const cartItem = appState.cart[i];
    const prod = rawFind(appState.inventory, p => p.id === cartItem.productId);
    if (prod) {
      prod.stock = Math.max(0, prod.stock - cartItem.qty);
      rawPush(itemSummary, `${cartItem.qty}x ${prod.name} (${prod.size})`);
    }
  }

  appState.todayWalkInSales += finalTotal;

  const change = cash - finalTotal;
  const saleId = "SALE-" + Math.floor(100000 + Math.random() * 900000);

  addAuditLog("WALK-IN POS", "pill-success", `Completed ${saleId}: ${rawJoin(itemSummary, ", ")} for ₱${finalTotal.toLocaleString()} (${promoDescription}). Stock synchronized.`);

  appState.cart = [];
  appState.activePromo = "none";
  if (cashInput) cashInput.value = "";

  saveState();
  renderAll();

  showToast(`✅ Sale ${saleId} successful! Change: ₱${change.toLocaleString()}`, "success");
}

// ==========================================
// ONLINE ORDERS & J&T SHIPPING TRACKER
// ==========================================
function renderOrders() {
  const tableBody = document.getElementById("ordersTableBody");
  const statusFilter = document.getElementById("orderStatusFilter");
  const searchInput = document.getElementById("orderSearchInput");

  const selectedStatus = statusFilter ? statusFilter.value : "All";
  const searchQuery = (searchInput ? searchInput.value : "").toLowerCase();

  const filtered = rawFilter(appState.orders, order => {
    const matchesStatus = selectedStatus === "All" || order.status === selectedStatus;
    const matchesSearch = order.customerName.toLowerCase().includes(searchQuery) ||
      order.id.toLowerCase().includes(searchQuery) ||
      order.trackingNumber.toLowerCase().includes(searchQuery) ||
      order.address.toLowerCase().includes(searchQuery);
    return matchesStatus && matchesSearch;
  });

  if (tableBody) {
    if (filtered.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="8" style="text-align: center; color: var(--sp-muted); padding: 24px;">No orders found matching criteria.</td></tr>`;
      return;
    }

    tableBody.innerHTML = rawJoin(rawMap(filtered, order => {
      let statusBadge = "";
      if (order.status === "Reserved") statusBadge = `<span class="badge badge-reserved">🔒 Reserved (DP Paid)</span>`;
      else if (order.status === "To Ship") statusBadge = `<span class="badge badge-transit">📦 To Ship</span>`;
      else if (order.status === "In-Transit") statusBadge = `<span class="badge badge-shipped">🚚 In-Transit (J&T)</span>`;
      else if (order.status === "Delivered") statusBadge = `<span class="badge badge-delivered">✅ Delivered</span>`;
      else statusBadge = `<span class="badge">${order.status}</span>`;

      return `
                <tr>
                    <td><strong>${order.id}</strong><br><small style="color:var(--sp-muted)">${order.date}</small></td>
                    <td>
                        <strong>${order.customerName}</strong><br>
                        <small>📞 ${order.phone}</small><br>
                        <small style="color: var(--sp-muted);">📍 ${order.address}</small>
                    </td>
                    <td>
                        <strong>${order.productName}</strong><br>
                        <small>SKU: ${order.sku} | Size: ${order.size}</small>
                    </td>
                    <td>
                        <strong>₱${order.itemPrice.toLocaleString()}</strong><br>
                        <small style="color:var(--sp-success)">DP: ₱${order.downpayment.toLocaleString()}</small><br>
                        <small style="color:var(--sp-red)">Bal: ₱${order.balance.toLocaleString()}</small>
                    </td>
                    <td>
                        <strong>${order.courier}</strong><br>
                        <small style="font-family:monospace; color:var(--sp-ink)">${order.trackingNumber || 'Pending Waybill'}</small>
                    </td>
                    <td>${statusBadge}</td>
                    <td>
                        <div style="display: flex; gap: 4px; flex-wrap: wrap;">
                            ${order.status === 'Reserved' ? `<button class="btn-small" onclick="updateOrderStatus('${order.id}', 'To Ship')">Pack for J&T</button>` : ''}
                            ${order.status === 'To Ship' ? `<button class="btn-small" onclick="updateOrderStatus('${order.id}', 'In-Transit')">Dispatch J&T</button>` : ''}
                            ${order.status === 'In-Transit' ? `<button class="btn-small btn-black" onclick="updateOrderStatus('${order.id}', 'Delivered')">Mark Delivered</button>` : ''}
                            <button class="btn-small btn-outline" onclick="viewOrderDetails('${order.id}')">Details</button>
                        </div>
                    </td>
                </tr>
            `;
    }), "");
  }
}

function updateOrderStatus(orderId, newStatus) {
  const order = rawFind(appState.orders, o => o.id === orderId);
  if (!order) return;

  const oldStatus = order.status;
  order.status = newStatus;

  const product = rawFind(appState.inventory, p => p.id === order.productId);
  if (product) {
    if (oldStatus === "Reserved" && newStatus !== "Reserved") {
      product.reserved = Math.max(0, (product.reserved || 1) - 1);
    }
    if (newStatus === "Delivered" && oldStatus !== "Delivered") {
      product.stock = Math.max(0, product.stock - 1);
      appState.todayOnlineSales += order.itemPrice;
    }
  }

  addAuditLog("ONLINE SHIPPING", "pill-info", `Order ${order.id} (${order.customerName}) status updated from [${oldStatus}] to [${newStatus}]. Courier: J&T Express.`);
  saveState();
  renderAll();
  showToast(`Order ${order.id} status updated to ${newStatus}`);
}

function openNewOrderModal() {
  const select = document.getElementById("newOrderProductSelect");
  if (select) {
    select.innerHTML = rawJoin(rawMap(appState.inventory, item => `
            <option value="${item.id}" ${item.stock <= 0 ? 'disabled' : ''}>
                ${item.name} (${item.code}) - Size: ${item.size} - ₱${item.basePrice.toLocaleString()} [Avail: ${item.stock}]
            </option>
        `), "");
  }
  document.getElementById("newOrderModal").classList.add("open");
}

function saveNewOnlineOrder(e) {
  e.preventDefault();
  const productId = document.getElementById("newOrderProductSelect").value;
  const customerName = document.getElementById("newOrderCustomerName").value.trim();
  const phone = document.getElementById("newOrderPhone").value.trim();
  const address = document.getElementById("newOrderAddress").value.trim();
  const downpayment = parseFloat(document.getElementById("newOrderDownpayment").value) || 0;
  const tracking = document.getElementById("newOrderTracking").value.trim() || `JNT-PH-${Math.floor(100000 + Math.random() * 900000)}`;
  const notes = document.getElementById("newOrderNotes").value.trim();

  const product = rawFind(appState.inventory, p => p.id === productId);
  if (!product) {
    showToast("Selected product not found.", "error");
    return;
  }

  if (product.stock <= 0) {
    showToast(`'${product.name}' is currently out of stock! Cannot reserve.`, "error");
    return;
  }

  const orderId = "ORD-" + Math.floor(1000 + Math.random() * 9000);
  const balance = Math.max(0, product.basePrice - downpayment);
  const now = new Date();
  const timeStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

  const newOrder = {
    id: orderId,
    customerName,
    phone,
    address,
    courier: "J&T Express",
    trackingNumber: tracking,
    productId: product.id,
    productName: product.name,
    sku: product.code,
    size: product.size,
    itemPrice: product.basePrice,
    downpayment,
    balance,
    status: "Reserved",
    date: timeStr,
    notes: notes || "Online Inquiry from FB Ads. Downpayment recorded."
  };

  product.reserved = (product.reserved || 0) + 1;
  rawUnshift(appState.orders, newOrder);

  addAuditLog("NEW ONLINE ORDER", "pill-warning", `Created Order ${orderId} for ${customerName}. 1 unit of '${product.name}' reserved. DP: ₱${downpayment.toLocaleString()}.`);

  closeModal("newOrderModal");
  saveState();
  renderAll();
  showToast(`✅ Order ${orderId} recorded! Stock reserved.`);
}

function viewOrderDetails(orderId) {
  const order = rawFind(appState.orders, o => o.id === orderId);
  if (!order) return;
  alert(`📦 SNEAKERPAPI ONLINE ORDER DETAILS:\n\nOrder ID: ${order.id}\nCustomer: ${order.customerName}\nContact: ${order.phone}\nDelivery Address:\n${order.address}\n\nItem: ${order.productName} (${order.sku})\nSize: ${order.size}\nTotal Price: ₱${order.itemPrice.toLocaleString()}\nDownpayment: ₱${order.downpayment.toLocaleString()}\nCOD Balance: ₱${order.balance.toLocaleString()}\n\nCourier: ${order.courier}\nTracking: ${order.trackingNumber}\nStatus: ${order.status}\nNotes: ${order.notes}`);
}

// ==========================================
// MASTER INVENTORY MANAGEMENT
// ==========================================
function renderInventory() {
  const tableBody = document.getElementById("inventoryTableBody");
  const categoryFilter = document.getElementById("invCategoryFilter");
  const authFilter = document.getElementById("invAuthFilter");
  const statusFilter = document.getElementById("invStatusFilter");
  const searchInput = document.getElementById("invSearchInput");

  const cat = categoryFilter ? categoryFilter.value : "All";
  const auth = authFilter ? authFilter.value : "All";
  const stat = statusFilter ? statusFilter.value : "All";
  const query = (searchInput ? searchInput.value : "").toLowerCase();

  let isAdmin = appState.role.toLowerCase().includes("admin");
  try {
    const storedUsers = localStorage.getItem("sp_users");
    if (storedUsers) {
      const users = JSON.parse(storedUsers);
      const currentUserObj = rawFind(users, u => (u.username === appState.role || u.name === appState.role || u.email === appState.role));
      if (currentUserObj && currentUserObj.role) {
        isAdmin = currentUserObj.role.toLowerCase().includes("admin");
      }
    }
  } catch (e) { }

  const filtered = rawFilter(appState.inventory, item => {
    const matchesCategory = cat === "All" || item.category === cat;
    const matchesAuth = auth === "All" || item.authenticity === auth;
    let matchesStatus = true;
    if (stat === "In Stock") matchesStatus = item.stock > item.reorderLevel;
    else if (stat === "Low Stock") matchesStatus = item.stock > 0 && item.stock <= item.reorderLevel;
    else if (stat === "Out of Stock") matchesStatus = item.stock === 0;
    else if (stat === "Damaged") matchesStatus = (item.damaged || 0) > 0;

    const matchesQuery = item.name.toLowerCase().includes(query) ||
      item.code.toLowerCase().includes(query) ||
      item.color.toLowerCase().includes(query) ||
      item.size.toLowerCase().includes(query);

    return matchesCategory && matchesAuth && matchesStatus && matchesQuery;
  });

  if (tableBody) {
    if (filtered.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="9" style="text-align: center; color: var(--sp-muted); padding: 24px;">No products found in inventory matching filters.</td></tr>`;
      return;
    }

    tableBody.innerHTML = rawJoin(rawMap(filtered, item => {
      let stockBadge = "";
      if (item.stock === 0) stockBadge = `<span class="badge badge-outstock">Out of Stock</span>`;
      else if (item.stock <= item.reorderLevel) stockBadge = `<span class="badge badge-lowstock">Low: ${item.stock}</span>`;
      else stockBadge = `<span class="badge badge-instock">${item.stock} Units</span>`;

      return `
          <tr>
            <td><strong style="font-family: monospace;">${item.code}</strong></td>
            <td>
              <strong>${item.name}</strong><br>
              <small style="color: var(--sp-muted);">${item.categoryPath || item.category}</small>
            </td>
            <td><span class="badge ${item.authenticity === 'Authentic' ? 'badge-authentic' : 'badge-replica'}">${item.authenticity}</span></td>
            <td>${item.size}</td>
            <td>${item.color}</td>
            <td><strong>₱${item.basePrice.toLocaleString()}</strong></td>
            <td>${stockBadge}</td>
            <td>
              <span style="color: #1D4ED8; font-weight: 700;">${item.reserved || 0}</span>
              ${item.damaged ? `<br><small style="color: var(--sp-red)">⚠️ ${item.damaged} damaged</small>` : ''}
            </td>
            <td>
              <div style="display: flex; gap: 4px; flex-wrap: wrap;">
                <button class="btn-small admin-only" ${!isAdmin ? 'disabled' : ''} onclick="openRestockModal('${item.id}')">Restock</button>
                <button class="btn-small btn-outline admin-only" ${!isAdmin ? 'disabled' : ''} onclick="openDamagedModal('${item.id}')">Report Damage</button>
              </div>
            </td>
          </tr>
        `;
    }), "");
  }
}

function openAddProductModal() {
  let isAdmin = appState.role.toLowerCase().includes("admin");
  try {
    const storedUsers = localStorage.getItem("sp_users");
    if (storedUsers) {
      const users = JSON.parse(storedUsers);
      const currentUserObj = rawFind(users, u => (u.username === appState.role || u.name === appState.role || u.email === appState.role));
      if (currentUserObj && currentUserObj.role) {
        isAdmin = currentUserObj.role.toLowerCase().includes("admin");
      }
    }
  } catch (e) { }

  if (!isAdmin) {
    showToast("⚠️ Permission Denied: Only Admin users can add new products to master inventory.", "error");
    return;
  }

  document.location.href = "product-registration.html";
}

function saveNewProduct(e) {
  e.preventDefault();
  let isAdmin = appState.role.toLowerCase().includes("admin");
  if (!isAdmin) {
    showToast("Permission denied.", "error");
    return;
  }

  const code = document.getElementById("newProdCode").value.trim().toUpperCase();
  const name = document.getElementById("newProdName").value.trim();
  const category = document.getElementById("newProdCategory").value;
  const categoryPath = document.getElementById("newProdCategoryPath").value.trim() || `Products > ${category}`;
  const size = document.getElementById("newProdSize").value.trim();
  const color = document.getElementById("newProdColor").value.trim();
  const basePrice = parseFloat(document.getElementById("newProdPrice").value) || 0;
  const authenticity = document.getElementById("newProdAuth").value;
  const stock = parseInt(document.getElementById("newProdStock").value) || 0;
  const reorderLevel = parseInt(document.getElementById("newProdReorder").value) || 3;

  if (rawSome(appState.inventory, p => p.code === code)) {
    showToast(`SKU '${code}' already exists in inventory!`, "error");
    return;
  }

  const newProduct = {
    id: "PROD-" + (appState.inventory.length + 101),
    code,
    name,
    category,
    categoryPath,
    size,
    color,
    basePrice,
    authenticity,
    stock,
    reserved: 0,
    damaged: 0,
    reorderLevel
  };

  rawPush(appState.inventory, newProduct);
  addAuditLog("PRODUCT REGISTRATION", "pill-success", `Registered new product '${name}' (SKU: ${code}) with ${stock} initial units.`);

  closeModal("addProductModal");
  saveState();
  renderAll();
  showToast(`✅ Product '${name}' registered successfully!`);
}

function openRestockModal(productId) {
  let isAdmin = appState.role.toLowerCase().includes("admin");
  try {
    const storedUsers = localStorage.getItem("sp_users");
    if (storedUsers) {
      const users = JSON.parse(storedUsers);
      const currentUserObj = rawFind(users, u => (u.username === appState.role || u.name === appState.role || u.email === appState.role));
      if (currentUserObj && currentUserObj.role) {
        isAdmin = currentUserObj.role.toLowerCase().includes("admin");
      }
    }
  } catch (e) { }

  if (!isAdmin) {
    showToast("⚠️ Permission Denied: Only Admin users can modify stock levels.", "error");
    return;
  }

  const product = rawFind(appState.inventory, p => p.id === productId);
  if (!product) return;

  document.getElementById("restockProdId").value = product.id;
  document.getElementById("restockProdInfo").textContent = `${product.name} (SKU: ${product.code} | Current Stock: ${product.stock} units)`;
  document.getElementById("restockModal").classList.add("open");
}

function saveRestock(e) {
  e.preventDefault();
  let isAdmin = appState.role.toLowerCase().includes("admin");
  if (!isAdmin) {
    showToast("Permission denied.", "error");
    return;
  }

  const productId = document.getElementById("restockProdId").value;
  const addQty = parseInt(document.getElementById("restockQty").value) || 0;
  const note = document.getElementById("restockNote").value.trim();

  const product = rawFind(appState.inventory, p => p.id === productId);
  if (!product) return;

  product.stock += addQty;
  addAuditLog("RESTOCK", "pill-success", `Restocked ${addQty} units for '${product.name}' (SKU: ${product.code}). New stock: ${product.stock}. Note: ${note || 'Supplier arrival'}`);

  closeModal("restockModal");
  saveState();
  renderAll();
  showToast(`✅ Added ${addQty} units to ${product.name}. New total: ${product.stock}`);
}

function openDamagedModal(productId) {
  const product = rawFind(appState.inventory, p => p.id === productId);
  if (!product) return;

  document.getElementById("damagedProdId").value = product.id;
  document.getElementById("damagedProdInfo").textContent = `${product.name} (SKU: ${product.code} | Available Stock: ${product.stock})`;
  document.getElementById("damagedModal").classList.add("open");
}

function saveDamagedReport(e) {
  e.preventDefault();
  const productId = document.getElementById("damagedProdId").value;
  const qty = parseInt(document.getElementById("damagedQty").value) || 1;
  const defect = document.getElementById("damagedDefect").value.trim();

  const product = rawFind(appState.inventory, p => p.id === productId);
  if (!product) return;

  if (qty > product.stock) {
    showToast(`Cannot report more damaged units (${qty}) than available stock (${product.stock})!`, "error");
    return;
  }

  product.stock = Math.max(0, product.stock - qty);
  product.damaged = (product.damaged || 0) + qty;

  const dmgId = "DMG-" + Math.floor(100 + Math.random() * 900);
  const now = new Date();
  const timeStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

  rawUnshift(appState.damaged, {
    id: dmgId,
    productId: product.id,
    productName: product.name,
    sku: product.code,
    size: product.size,
    quantity: qty,
    defectDescription: defect,
    status: "Pending Supplier Return",
    reportedBy: appState.role,
    date: timeStr
  });

  addAuditLog("DAMAGED STOCK", "pill-danger", `Reported ${qty} defective units for '${product.name}' (${defect}). Deducted from active stock, queued for supplier replacement.`);

  closeModal("damagedModal");
  saveState();
  renderAll();
  showToast(`⚠️ Defect recorded for ${product.name}. Queued for supplier replacement.`);
}

// ==========================================
// DAMAGED & REPLACEMENT RETURNS
// ==========================================
function renderDamaged() {
  const container = document.getElementById("damagedTableBody");
  if (!container) return;

  if (appState.damaged.length === 0) {
    container.innerHTML = `<tr><td colspan="7" style="text-align: center; color: var(--sp-muted); padding: 24px;">No damaged items reported. All inventory in good condition.</td></tr>`;
    return;
  }

  let isAdmin = appState.role.toLowerCase().includes("admin");
  try {
    const storedUsers = localStorage.getItem("sp_users");
    if (storedUsers) {
      const users = JSON.parse(storedUsers);
      const currentUserObj = rawFind(users, u => (u.username === appState.role || u.name === appState.role || u.email === appState.role));
      if (currentUserObj && currentUserObj.role) {
        isAdmin = currentUserObj.role.toLowerCase().includes("admin");
      }
    }
  } catch (e) { }

  container.innerHTML = rawJoin(rawMap(appState.damaged, item => `
        <tr>
            <td><strong>${item.id}</strong><br><small style="color:var(--sp-muted)">${item.date}</small></td>
            <td><strong>${item.productName}</strong><br><small>SKU: ${item.sku} | Size: ${item.size}</small></td>
            <td><strong style="color:var(--sp-red)">${item.quantity} Unit(s)</strong></td>
            <td>${item.defectDescription}</td>
            <td><span class="badge ${item.status === 'Replacement Received' ? 'badge-delivered' : 'badge-damaged'}">${item.status}</span></td>
            <td>${item.reportedBy}</td>
            <td>
                ${item.status !== 'Replacement Received' ? `
                    <button class="btn-small admin-only" ${!isAdmin ? 'disabled' : ''} onclick="resolveDamagedReplacement('${item.id}')">
                        Mark Replaced
                    </button>
                ` : '<small style="color:var(--sp-success)">Resolved</small>'}
            </td>
        </tr>
    `), "");
}

function resolveDamagedReplacement(damageId) {
  let isAdmin = appState.role.toLowerCase().includes("admin");
  try {
    const storedUsers = localStorage.getItem("sp_users");
    if (storedUsers) {
      const users = JSON.parse(storedUsers);
      const currentUserObj = rawFind(users, u => (u.username === appState.role || u.name === appState.role || u.email === appState.role));
      if (currentUserObj && currentUserObj.role) {
        isAdmin = currentUserObj.role.toLowerCase().includes("admin");
      }
    }
  } catch (e) { }

  if (!isAdmin) {
    showToast("Only Admin users can confirm replacement receipt.", "error");
    return;
  }

  const item = rawFind(appState.damaged, d => d.id === damageId);
  if (!item) return;

  item.status = "Replacement Received";
  const product = rawFind(appState.inventory, p => p.id === item.productId);
  if (product) {
    product.damaged = Math.max(0, (product.damaged || 1) - item.quantity);
    product.stock += item.quantity;
  }

  addAuditLog("SUPPLIER REPLACEMENT", "pill-success", `Replacement received from supplier for ${item.id} (${item.quantity}x ${item.productName}). Returned to active inventory.`);
  saveState();
  renderAll();
  showToast(`✅ Replacement recorded! ${item.quantity} units returned to active stock.`);
}

// ==========================================
// ACTIVITY AUDIT LOGS
// ==========================================
function renderLogs() {
  const container = document.getElementById("logListContainer");
  if (!container) return;

  if (appState.logs.length === 0) {
    container.innerHTML = `<li style="padding: 20px; text-align: center; color: var(--sp-muted);">No activity logs recorded yet.</li>`;
    return;
  }

  container.innerHTML = rawJoin(rawMap(appState.logs, log => `
        <li class="log-item">
            <div class="log-time">${log.timestamp}</div>
            <span class="log-tag ${log.tagClass || 'pill-info'}">${log.tag}</span>
            <div class="log-content">
                <span class="log-actor">[${log.actor}]</span> ${log.message}
            </div>
        </li>
    `), "");
}

// ==========================================
// TABS & MODALS NAVIGATION
// ==========================================
function switchTab(tabId) {
  const tabBtns = document.querySelectorAll(".tab-btn");
  rawForEach(tabBtns, btn => {
    if (btn.getAttribute("data-tab") === tabId) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });

  const tabPanels = document.querySelectorAll(".tab-panel");
  rawForEach(tabPanels, panel => {
    if (panel.id === tabId) {
      panel.classList.add("active");
    } else {
      panel.classList.remove("active");
    }
  });

  if (tabId === "tab-pos") renderPOS();
  else if (tabId === "tab-orders") renderOrders();
  else if (tabId === "tab-inventory") renderInventory();
  else if (tabId === "tab-damaged") renderDamaged();
  else if (tabId === "tab-logs") renderLogs();
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.remove("open");
}

window.addEventListener("click", function (e) {
  if (e.target.classList.contains("modal-backdrop")) {
    e.target.classList.remove("open");
  }
});

// ==========================================
// LIVE STORE CLOCK
// ==========================================
function updateStoreClock() {
  const clockEl = document.getElementById("storeLiveClock");
  if (clockEl) {
    const now = new Date();
    const options = { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
    clockEl.textContent = now.toLocaleDateString('en-US', options);
  }
}

// ==========================================
// MASTER RENDER
// ==========================================
function renderAll() {
  renderRoleUI();
  renderKPIs();
  renderPOS();
  renderOrders();
  renderInventory();
  renderDamaged();
  renderLogs();
}

// ==========================================
// INITIALIZATION
// ==========================================
document.addEventListener("DOMContentLoaded", function () {
  loadState();
  renderAll();
  setInterval(updateStoreClock, 1000);
  updateStoreClock();

  rawForEach(document.querySelectorAll(".tab-btn"), btn => {
    btn.addEventListener("click", function () {
      switchTab(this.getAttribute("data-tab"));
    });
  });

  rawForEach(document.querySelectorAll(".promo-btn"), btn => {
    btn.addEventListener("click", function () {
      setPromo(this.getAttribute("data-promo"));
    });
  });

  const posCashInput = document.getElementById("posCashTendered");
  if (posCashInput) {
    posCashInput.addEventListener("input", calculateChange);
  }

  const posSearchInput = document.getElementById("posSearchInput");
  if (posSearchInput) {
    posSearchInput.addEventListener("input", renderPOS);
  }

  const posCategoryFilter = document.getElementById("posCategoryFilter");
  if (posCategoryFilter) {
    posCategoryFilter.addEventListener("change", renderPOS);
  }

  const invSearchInput = document.getElementById("invSearchInput");
  if (invSearchInput) {
    invSearchInput.addEventListener("input", renderInventory);
  }

  const invCategoryFilter = document.getElementById("invCategoryFilter");
  if (invCategoryFilter) {
    invCategoryFilter.addEventListener("change", renderInventory);
  }

  const invAuthFilter = document.getElementById("invAuthFilter");
  if (invAuthFilter) {
    invAuthFilter.addEventListener("change", renderInventory);
  }

  const invStatusFilter = document.getElementById("invStatusFilter");
  if (invStatusFilter) {
    invStatusFilter.addEventListener("change", renderInventory);
  }

  const orderStatusFilter = document.getElementById("orderStatusFilter");
  if (orderStatusFilter) {
    orderStatusFilter.addEventListener("change", renderOrders);
  }

  const orderSearchInput = document.getElementById("orderSearchInput");
  if (orderSearchInput) {
    orderSearchInput.addEventListener("input", renderOrders);
  }

  const addProductForm = document.getElementById("addProductForm");
  if (addProductForm) addProductForm.addEventListener("submit", saveNewProduct);

  const restockForm = document.getElementById("restockForm");
  if (restockForm) restockForm.addEventListener("submit", saveRestock);

  const damagedForm = document.getElementById("damagedForm");
  if (damagedForm) damagedForm.addEventListener("submit", saveDamagedReport);

  const newOrderForm = document.getElementById("newOrderForm");
  if (newOrderForm) newOrderForm.addEventListener("submit", saveNewOnlineOrder);
});

const openSignupBtn = document.getElementById("openSignup");
if (openSignupBtn) {
  openSignupBtn.addEventListener("click", function () {
    document.location.href = "module_2/signup.html";
  });
}