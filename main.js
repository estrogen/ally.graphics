var fBtn = document.getElementById('forwardBtn');
var body = document.getElementsByTagName('body')[0];
var num = Math.floor(Math.random() * 8);
body.style.backgroundImage = "url('./images/"+num+".jpg')";
var dob = new Date('12/07/2001');  
var month_diff = Date.now() - dob.getTime();  
var age_dt = new Date(month_diff);   
var year = age_dt.getUTCFullYear();  
var age = Math.abs(year - 1970);  
document.getElementById("age").innerHTML = age;

document.addEventListener('DOMContentLoaded', function() {
  const styleTabs = document.querySelectorAll('.style-tab');
  const randomIndex = Math.floor(Math.random() * styleTabs.length);
  const selectedTab = styleTabs[randomIndex];
  
  document.body.className = selectedTab.getAttribute('data-style');
  styleTabs.forEach(tab => tab.classList.remove('active'));
  selectedTab.classList.add('active');

  const profile = document.querySelector('.profile');
  const tooltip = document.querySelector('.tooltip-text');

  profile.addEventListener('mousemove', function(e) {
    const tooltipWidth = tooltip.offsetWidth;
    const tooltipHeight = tooltip.offsetHeight;

    let top = e.pageY - tooltipHeight;
    let left = e.pageX - (tooltipWidth / 2);

    tooltip.style.top = top + 'px';
    tooltip.style.left = left + 'px';
  });

  profile.addEventListener('mouseenter', function() {
    tooltip.style.opacity = '1';
  });

  profile.addEventListener('mouseleave', function() {
    tooltip.style.opacity = '0';
  });

  let tabs = document.querySelectorAll('.style-tab');
  tabs.forEach(function(tab) {
      tab.addEventListener('click', function() {

          tabs.forEach(innerTab => innerTab.classList.remove('active'));
          tab.classList.add('active');
          document.body.className = tab.getAttribute('data-style');
      });
  });
});

const tabs = document.querySelectorAll('.tab');
const contentContainers = document.querySelectorAll('.content');
let currentTabIndex = 0;

contentContainers.forEach(content => {
    content.addEventListener('transitionend', function(event) {
        if (event.propertyName === 'opacity' && window.getComputedStyle(this).opacity == '0') {
            this.style.display = 'none';
            this.classList.remove('slide-left', 'slide-right');
        }
    });

    content.addEventListener('animationend', function(event) {
        if (event.animationName === 'fadeIn') {
            this.classList.remove('fade-in');
        }
    });
});

function deactivateAll() {
    tabs.forEach(tab => tab.classList.remove('active'));
    contentContainers.forEach(container => {
        container.style.opacity = '0';
        container.classList.remove('active');
    });
}

tabs.forEach((tab, index) => {
    tab.addEventListener('click', function() {
        if (index !== currentTabIndex) {
            deactivateAll();

            contentContainers[currentTabIndex].classList.add(`slide-left`);
            tab.classList.add('active');
            const contentId = tab.getAttribute('data-tab') + "-content";
            const activeContent = document.getElementById(contentId);
            activeContent.style.display = 'block';
            activeContent.classList.add('fade-in');
            activeContent.classList.add('active');
            activeContent.style.opacity = '1';

            currentTabIndex = index;
        }
    });
});