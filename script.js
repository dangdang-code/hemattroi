// Dữ liệu thiên văn
const sunData = {
name: "Mặt Trời", sciName: "Sun",
pos: "Trung tâm Hệ Mặt Trời", orbit: "Tự quay quanh trục: ~25,31 ngày",
atmosphere: "Hydro (73%), Heli (25%)", temp: "5,500°C (Bề mặt) - 15 triệu °C (Lõi)",
mass: "1.989 × 10^30 kg (99.8% KL toàn hệ)", diameter: "1,392,700 km", rings: "Không có",
image: "mattroi.jpg"
};

const moonData = {
    name: "Mặt Trăng", sciName: "Moon",
    pos: "Vệ tinh tự nhiên của Trái Đất", orbit: "27.3 ngày (Quanh Trái Đất)",
    atmosphere: "Cực kỳ mỏng (Gần như chân không)", temp: "-173°C đến 127°C",
    mass: "7.34 × 10^22 kg", diameter: "3,474 km", rings: "Không có", // <-- Thêm dấu phẩy ở đây
    image: "mattrang.jpg" // <-- Thêm đường dẫn ảnh của bạn vào đây
};

const planetsData = [
    {
        name: "Sao Thủy", sciName: "Mercury", pos: "Hành tinh thứ 1", orbit: "88 ngày Trái Đất",
        atmosphere: "Cực kỳ mỏng", temp: "-173°C đến 427°C", mass: "3.30 × 10^23 kg", diameter: "4,879 km", rings: "Không có",
        size: 12, orbitSize: 130, speed: 20, color: "#9e9e9e", // <-- Thêm dấu phẩy ở đây
        image: "thuy.jpg" // <-- Thêm đường dẫn ảnh của bạn vào đây
    },
    {
        name: "Sao Kim", sciName: "Venus", pos: "Hành tinh thứ 2", orbit: "225 ngày Trái Đất",
        atmosphere: "Dày đặc (CO2, Nitơ)", temp: "462°C", mass: "4.87 × 10^24 kg", diameter: "12,104 km", rings: "Không có",
        size: 18, orbitSize: 190, speed: 15, color: "#e6b800",
        image: "kim.jpg"
    },
    {
        name: "Trái Đất", sciName: "Earth", pos: "Hành tinh thứ 3", orbit: "365.25 ngày",
        atmosphere: "Nitơ (78%), Oxy (21%)", temp: "-89°C đến 58°C", mass: "5.97 × 10^24 kg", diameter: "12,742 km", rings: "1 Mặt Trăng tự nhiên",
        size: 20, orbitSize: 260, speed: 12, isEarth: true ,
        image: "traidat.jpg"
    },
    {
        name: "Sao Hỏa", sciName: "Mars", pos: "Hành tinh thứ 4", orbit: "687 ngày Trái Đất",
        atmosphere: "Mỏng (CO2)", temp: "-143°C đến 35°C", mass: "6.42 × 10^23 kg", diameter: "6,779 km", rings: "Không có",
        size: 15, orbitSize: 330, speed: 10, color: "#ff5722",
        image: "hoa.png"
    },
    {
        name: "Sao Mộc", sciName: "Jupiter", pos: "Hành tinh thứ 5", orbit: "12 năm Trái Đất",
        atmosphere: "Hydro, Heli", temp: "-108°C", mass: "1.90 × 10^27 kg", diameter: "139,820 km", rings: "Có (Hệ thống bụi rất mờ)",
        size: 38, orbitSize: 440, speed: 7, color: "#bcaaa4",
        hasRing: true, ringColor: "rgba(188, 170, 164, 0.4)", ringWidth: 6,
        image: "moc.png"
    },
    {
        name: "Sao Thổ", sciName: "Saturn", pos: "Hành tinh thứ 6", orbit: "29 năm Trái Đất",
        atmosphere: "Hydro, Heli", temp: "-139°C", mass: "5.68 × 10^26 kg", diameter: "116,460 km", rings: "Có (Vành đai lộng lẫy nhất)",
        size: 32, orbitSize: 570, speed: 5, color: "#ffe082",
        hasRing: true, ringColor: "rgba(255, 224, 130, 0.55)", ringWidth: 16,
        image: "tho.jpg"
    },
    {
        name: "Sao Thiên Vương", sciName: "Uranus", pos: "Hành tinh thứ 7", orbit: "84 năm Trái Đất",
        atmosphere: "Hydro, Heli, Methane", temp: "-197°C", mass: "8.68 × 10^25 kg", diameter: "50,724 km", rings: "Có (Mỏng, tối màu)",
        size: 25, orbitSize: 700, speed: 3, color: "#80deea",
        hasRing: true, ringColor: "rgba(128, 222, 234, 0.45)", ringWidth: 8,
        image: "thienvuong.jpg"
    },
    {
        name: "Sao Hải Vương", sciName: "Neptune", pos: "Hành tinh thứ 8", orbit: "165 năm Trái Đất",
        atmosphere: "Hydro, Heli, Methane", temp: "-201°C", mass: "1.02 × 10^26 kg", diameter: "49,244 km", rings: "Có (Mờ nhạt)",
        size: 24, orbitSize: 820, speed: 2, color: "#3f51b5",
        hasRing: true, ringColor: "rgba(63, 81, 181, 0.45)", ringWidth: 5,
        image: "haivuong.jpg"
    }
];

const solarSystem = document.querySelector('.solar-system');
const galaxyContainer = document.querySelector('.galaxy-container');
const universe = document.getElementById('universe');
const infoPanel = document.getElementById('info-panel');
const closeBtn = document.getElementById('close-btn');
const playPauseBtn = document.getElementById('play-pause-btn');
const sunEl = document.querySelector('.sun');
let isPaused = false;

// --- TÍCH HỢP ZOOM & PANNING (DI CHUYỂN) ---
let zoomLevel = 1.0;
const maxZoom = 3.0;
const minZoom = 0.25;

let isDragging = false;
let startX = 0, startY = 0;
let offsetX = 0, offsetY = 0; // Tọa độ dịch chuyển của hệ mặt trời

// Hàm cốt lõi: Gộp chung cả dịch chuyển (translate) và phóng to (scale)
function updateTransform() {
    solarSystem.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${zoomLevel})`;
}

// 1. Lắng nghe sự kiện kéo chuột trên vùng không gian nền
galaxyContainer.addEventListener('mousedown', (e) => {
    // Chỉ kích hoạt kéo khi click vào nền trống (galaxyContainer) hoặc tâm hệ mặt trời, tránh click nhầm nút/hành tinh
    if (e.target === galaxyContainer || e.target === solarSystem) {
        isDragging = true;
        startX = e.clientX - offsetX;
        startY = e.clientY - offsetY;
    }
});

window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    offsetX = e.clientX - startX;
    offsetY = e.clientY - startY;
    updateTransform();
});

window.addEventListener('mouseup', () => {
    isDragging = false;
});

// 2. Logic cho bộ nút Zoom
document.getElementById('zoom-in').addEventListener('click', (e) => {
    e.stopPropagation();
    if (zoomLevel < maxZoom) {
        zoomLevel += 0.2;
        updateTransform();
    }
});

document.getElementById('zoom-out').addEventListener('click', (e) => {
    e.stopPropagation();
    if (zoomLevel > minZoom) {
        zoomLevel -= 0.2;
        updateTransform();
    }
});

// Nút Đặt lại (🔄): Đưa cả kích thước lẫn vị trí về trung tâm ban đầu
document.getElementById('zoom-reset').addEventListener('click', (e) => {
    e.stopPropagation();
    zoomLevel = 1.0;
    offsetX = 0;
    offsetY = 0;
    updateTransform();
});

// 3. Sự kiện lăn chuột (Wheel)
galaxyContainer.addEventListener('wheel', (e) => {
    e.preventDefault(); 
    if (e.deltaY < 0) {
        if (zoomLevel < maxZoom) zoomLevel += 0.05;
    } else {
        if (zoomLevel > minZoom) zoomLevel -= 0.05;
    }
    updateTransform();
}, { passive: false });


// Bật thông tin Mặt Trời khi click
sunEl.addEventListener('click', (e) => {
    e.stopPropagation();
    showPlanetInfo(sunData);
});

// Tạo các ngôi sao lấp lánh
function createStars() {
    const starCount = 150;
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        const size = Math.random() * 2.5;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${Math.random() * 100}vw`;
        star.style.top = `${Math.random() * 100}vh`;
        star.style.setProperty('--duration', `${2 + Math.random() * 4}s`);
        universe.appendChild(star);
    }
}

// Tạo giao diện Quỹ đạo, Hành tinh, Vành đai
function initSolarSystem() {
    planetsData.forEach((planet) => {
        const orbit = document.createElement('div');
        orbit.classList.add('orbit');
        orbit.style.width = `${planet.orbitSize}px`;
        orbit.style.height = `${planet.orbitSize}px`;

        const planetContainer = document.createElement('div');
        planetContainer.classList.add('planet-container');
        planetContainer.style.setProperty('--orbit-speed', `${150 / planet.speed}s`);

        let planetEl;

        if (planet.isEarth) {
            const earthGroup = document.createElement('div');
            earthGroup.classList.add('earth-group');
            earthGroup.style.width = `${planet.size}px`;
            earthGroup.style.height = `${planet.size}px`;
            
            planetEl = document.createElement('div');
            planetEl.classList.add('planet', 'earth-planet');
            planetEl.style.width = `${planet.size}px`;
            planetEl.style.height = `${planet.size}px`;
            earthGroup.appendChild(planetEl);

            const moonOrbit = document.createElement('div');
            moonOrbit.classList.add('moon-orbit');
            earthGroup.appendChild(moonOrbit);

            const moonContainer = document.createElement('div');
            moonContainer.classList.add('moon-container');
            
            const moonPlanet = document.createElement('div');
            moonPlanet.classList.add('moon-planet');
            moonPlanet.addEventListener('click', (e) => {
                e.stopPropagation();
                showPlanetInfo(moonData);
            });
            moonContainer.appendChild(moonPlanet);
            
            moonOrbit.appendChild(moonContainer);
            planetContainer.appendChild(earthGroup);
        } else {
            planetEl = document.createElement('div');
            planetEl.classList.add('planet');
            planetEl.style.width = `${planet.size}px`;
            planetEl.style.height = `${planet.size}px`;
            planetEl.style.backgroundColor = planet.color;
            
            if (planet.hasRing) {
                const ringEl = document.createElement('div');
                ringEl.classList.add('ring');
                const ringSize = planet.size + planet.ringWidth * 2.5; 
                ringEl.style.width = `${ringSize}px`;
                ringEl.style.height = `${ringSize}px`;
                ringEl.style.border = `${planet.ringWidth}px double ${planet.ringColor}`;
                planetContainer.appendChild(ringEl); 
            }
            planetContainer.appendChild(planetEl);
        }

        planetEl.addEventListener('click', (e) => {
            e.stopPropagation();
            showPlanetInfo(planet);
        });

        orbit.appendChild(planetContainer);
        solarSystem.appendChild(orbit);
    });
}

// Hàm hiển thị thông tin (Cập nhật thêm dòng đổi ảnh)
function showPlanetInfo(data) {
    document.getElementById('p-name').innerText = data.name;
    document.getElementById('p-sci-name').innerText = data.sciName;
    
    // THÊM DÒNG NÀY ĐỂ ĐỔI ẢNH KHI CLICK
    document.getElementById('p-img').src = data.image; 

    document.getElementById('p-pos').innerText = data.pos;
    document.getElementById('p-orbit').innerText = data.orbit;
    document.getElementById('p-atmosphere').innerText = data.atmosphere;
    document.getElementById('p-temp').innerText = data.temp;
    document.getElementById('p-mass').innerText = data.mass;
    document.getElementById('p-diameter').innerText = data.diameter;
    document.getElementById('p-rings').innerText = data.rings;

    infoPanel.classList.remove('hidden');
}

// Logic nút bấm Tạm dừng
playPauseBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    isPaused = !isPaused;
    if (isPaused) {
        solarSystem.classList.add('paused');
        playPauseBtn.innerText = "▶ Tiếp tục quay";
    } else {
        solarSystem.classList.remove('paused');
        playPauseBtn.innerText = "⏸ Tạm dừng";
    }
});

closeBtn.addEventListener('click', () => infoPanel.classList.add('hidden'));
document.body.addEventListener('click', () => infoPanel.classList.add('hidden'));

// Khởi chạy
createStars();
initSolarSystem();