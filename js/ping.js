// ping.js

function Pinger_ping(ip, callback) {
    if (!this.inUse) {
      this.inUse = true;
      this.callback = callback;
      this.ip = ip;
  
      var _that = this;
  
      this.img = new Image();
      this.img.onload = function() { _that.good(); };
      this.img.onerror = function() { _that.good(); };
  
      this.start = new Date().getTime();
      this.img.src = "http://" + ip + "/?cachebreaker=" + new Date().getTime(); // Cache breaker to avoid caching issues
      this.timer = setTimeout(function() { _that.bad(); }, 1500);
    }
  }
  
  Pinger_ping.prototype.good = function() {
    clearTimeout(this.timer);
    this.inUse = false;
    if (this.callback) this.callback(true);
  };
  
  Pinger_ping.prototype.bad = function() {
    this.inUse = false;
    if (this.callback) this.callback(false);
  };
  
  function pingURL(url, callback) {
    var pinger = new Pinger_ping(url, callback);
  }
  

// Initialize pings for status checking
document.addEventListener('DOMContentLoaded', function() {
    var statusIndicators = document.querySelectorAll('.status-indicator');

    statusIndicators.forEach(function(indicator) {
        var url = indicator.getAttribute('data-url');
        pingURL(url, function(isActive) {
            indicator.textContent = isActive ? 'Online' : 'Offline';
            indicator.style.color = isActive ? '#39FF14' : '#FF073A'; // Neon green for online, neon red for offline
        });
    });
});



// example for using html 

// <li>
// <a href="https://torrenttribe.com/" target="_blank" id="star">Torrent Tribe</a>
// <div class="description">- Resource for torrents.</div>
// <span class="status-indicator loading" data-url="https://torrenttribe.com/">Loading...</span>
// </li>

//    <script src="js/ping.js"></script>