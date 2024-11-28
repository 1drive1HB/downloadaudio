document.addEventListener('DOMContentLoaded', () => {
    class Pinger {
      constructor(ip, callback) {
        this.inUse = false;
        this.img = null;
        this.start = null;
        this.timer = null;
        this.callback = callback;
        this.ip = ip;
      }
  
      ping() {
        if (!this.inUse) {
          this.inUse = true;
  
          const _that = this;
          this.img = new Image();
  
          // On success
          this.img.onload = function () {
            _that.good();
          };
  
          // On error
          this.img.onerror = function () {
            _that.bad();
          };
  
          // Start time tracking and request
          this.start = new Date().getTime();
          this.img.src = "https://" + this.ip + "/favicon.ico?time=" + this.start; // Add time to avoid caching
          this.timer = setTimeout(function () {
            _that.bad();
          }, 1500); // Timeout after 1.5 seconds
        }
      }
  
      good() {
        clearTimeout(this.timer);
        this.inUse = false;
        this.callback(true, this.ip);
      }
  
      bad() {
        clearTimeout(this.timer);
        this.inUse = false;
        this.callback(false, this.ip);
      }
    }
  
    // Function to update the status indicator
    function updateStatus(indicator, status) {
      if (status === "loading") {
        indicator.textContent = "loading...";
        indicator.style.color = "#f39c12"; // Orange
      } else if (status) {
        indicator.textContent = "Online";
        indicator.style.color = "#39FF14"; // Green
      } else {
        indicator.textContent = "Offline";
        indicator.style.color = "#FF073A"; // Red
      }
    }
  
    // Get all status indicators and check each URL
    const indicators = document.querySelectorAll('.status-indicator');
    indicators.forEach((indicator) => {
      const ip = indicator.getAttribute('data-url');
  
      // Set loading state
      updateStatus(indicator, "loading");
  
      // Ping the URL
      const pinger = new Pinger(ip, (isOnline) => {
        updateStatus(indicator, isOnline);
      });
  
      pinger.ping();
    });
  });
  