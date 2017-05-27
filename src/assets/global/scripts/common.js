var Common = (function() {

    return {
        startLoading: function() {
            $('.loading-container').remove();
            $('app-root').append(`<div class="loading-container">
                <div class="loading-dot dot-1"></div>
                <div class="loading-dot dot-2"></div>
                <div class="loading-dot dot-3"></div>
                <div class="loading-dot dot-4"></div>
                <div class="loading-dot dot-5"></div>
                <div class="loading-dot dot-6"></div>
                <div class="loading-dot dot-7"></div>
                <div class="loading-dot dot-8"></div>
                </div>`)
        },
        stopLoading: function() {
            $('.loading-container').remove();
        }
    }
})();