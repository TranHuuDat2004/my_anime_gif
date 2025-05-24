// --- DỮ LIỆU GIF ---
// QUAN TRỌNG: Bạn cần tự cập nhật danh sách `fileNames` trong mỗi series
// khi bạn thêm hoặc xóa file GIF trong các thư mục tương ứng.
// JavaScript không thể tự động "đọc" thư mục trên GitHub Pages.

// --- DOM ELEMENTS ---
const gifGallery = document.getElementById('gif-gallery');
const searchBar = document.getElementById('search-bar');
const seriesNavigation = document.getElementById('series-navigation');
const loadingMessage = document.getElementById('loading-message');

let currentFilter = 'all'; // 'all' hoặc key của series
let allGifsForDisplay = []; // Mảng chứa tất cả GIF đã được xử lý (có fullUrl)

// --- FUNCTIONS ---

// Tạo và hiển thị các nút lọc series
function populateSeriesNavigation() {
    const allButton = document.createElement('button');
    allButton.textContent = 'Tất Cả Series';
    allButton.dataset.seriesKey = 'all';
    allButton.classList.add('active'); // Nút 'All' active mặc định
    allButton.addEventListener('click', () => filterBySeries('all'));
    seriesNavigation.appendChild(allButton);

    for (const seriesKey in animeGifData) {
        const button = document.createElement('button');
        button.textContent = animeGifData[seriesKey].displayName;
        button.dataset.seriesKey = seriesKey;
        button.addEventListener('click', () => filterBySeries(seriesKey));
        seriesNavigation.appendChild(button);
    }
}

// Lọc GIF theo series được chọn
function filterBySeries(seriesKey) {
    currentFilter = seriesKey;
    document.querySelectorAll('#series-navigation button').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.seriesKey === seriesKey);
    });
    // Trigger lại việc hiển thị và tìm kiếm (nếu có text trong search bar)
    performSearchAndDisplay();
}

// Chuẩn bị dữ liệu GIF để hiển thị (thêm fullUrl, seriesName)
function prepareAllGifs() {
    allGifsForDisplay = [];
    for (const seriesKey in animeGifData) {
        const series = animeGifData[seriesKey];
        series.gifs.forEach(gif => {
            let fullUrl;
            if (series.isExternal) {
                fullUrl = gif.url; // Sử dụng URL trực tiếp nếu là link ngoài
            } else {
                fullUrl = series.folder + gif.fileName; // Tạo URL từ folder và fileName
            }
            allGifsForDisplay.push({
                ...gif,
                fullUrl: fullUrl,
                seriesName: series.displayName,
                seriesKey: seriesKey // Lưu key để lọc
            });
        });
    }
}

// Hiển thị GIF lên gallery
function displayGifs(gifsToDisplay) {
    gifGallery.innerHTML = ''; // Xóa nội dung cũ

    if (gifsToDisplay.length === 0) {
        gifGallery.innerHTML = '<p class="placeholder-text">Không tìm thấy GIF nào phù hợp.</p>';
        return;
    }

    gifsToDisplay.forEach(gif => {
        const gifItem = document.createElement('div');
        gifItem.classList.add('gif-item');

        const img = document.createElement('img');
        img.src = gif.fullUrl;
        img.alt = gif.title;
        img.loading = 'lazy';

        const gifInfoDiv = document.createElement('div');
        gifInfoDiv.classList.add('gif-info');

        const titleDiv = document.createElement('div');
        titleDiv.classList.add('gif-title');
        titleDiv.textContent = gif.title;

        const seriesNameDiv = document.createElement('div');
        seriesNameDiv.classList.add('gif-series-name');
        seriesNameDiv.textContent = gif.seriesName; // Hiển thị tên series

        gifInfoDiv.appendChild(titleDiv);
        gifInfoDiv.appendChild(seriesNameDiv);

        gifItem.appendChild(img);
        gifItem.appendChild(gifInfoDiv);
        gifGallery.appendChild(gifItem);
    });
}

// Thực hiện tìm kiếm và hiển thị kết quả
function performSearchAndDisplay() {
    const searchTerm = searchBar.value.toLowerCase().trim();
    let gifsToFilter = [];

    if (currentFilter === 'all') {
        gifsToFilter = allGifsForDisplay;
    } else if (animeGifData[currentFilter]) {
        // Lấy lại các GIF của series hiện tại từ allGifsForDisplay
        gifsToFilter = allGifsForDisplay.filter(gif => gif.seriesKey === currentFilter);
    }

    const filteredGifs = gifsToFilter.filter(gif =>
        gif.title.toLowerCase().includes(searchTerm) ||
        (gif.tags && gif.tags.some(tag => tag.toLowerCase().includes(searchTerm))) ||
        gif.seriesName.toLowerCase().includes(searchTerm) // Tìm cả trong tên series
    );
    displayGifs(filteredGifs);
}

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    if (loadingMessage) {
        loadingMessage.remove();
    }
    prepareAllGifs(); // Chuẩn bị dữ liệu một lần
    populateSeriesNavigation(); // Tạo các nút lọc series
    performSearchAndDisplay(); // Hiển thị tất cả GIF (hoặc theo filter mặc định) ban đầu
});

// Xử lý sự kiện tìm kiếm
searchBar.addEventListener('input', performSearchAndDisplay);

// --- VIEW OPTIONS ---
const viewOptionsButtons = document.querySelectorAll('#view-options button');
const gifGalleryElement = document.getElementById('gif-gallery'); // Đảm bảo đã có biến này từ trước hoặc lấy lại

// Hàm để áp dụng class kích thước và lưu vào localStorage
function applyViewSize(size) {
    gifGalleryElement.classList.remove('view-small', 'view-medium', 'view-large');
    gifGalleryElement.classList.add(`view-${size}`);

    viewOptionsButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.size === size);
    });
    localStorage.setItem('gifViewSize', size); // Lưu lựa chọn
}

// Xử lý click cho các nút tùy chọn view
viewOptionsButtons.forEach(button => {
    button.addEventListener('click', () => {
        const newSize = button.dataset.size;
        applyViewSize(newSize);
    });
});

// Khi tải trang, kiểm tra xem có lựa chọn đã lưu không
document.addEventListener('DOMContentLoaded', () => {
    // ... (code DOMContentLoaded hiện tại của bạn) ...

    const savedViewSize = localStorage.getItem('gifViewSize');
    if (savedViewSize) {
        applyViewSize(savedViewSize);
    } else {
        // Nếu không có gì được lưu, đặt kích thước mặc định (ví dụ: medium)
        // Đảm bảo #gif-gallery có class .view-medium ban đầu trong HTML hoặc áp dụng ở đây
        if (!gifGalleryElement.classList.contains('view-small') &&
            !gifGalleryElement.classList.contains('view-medium') &&
            !gifGalleryElement.classList.contains('view-large')) {
            applyViewSize('medium'); // Hoặc class mặc định của bạn
        }
    }
});
