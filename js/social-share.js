(function(document) {
    window.dataLayer = window.dataLayer || [];
  
    const socialLinks = [...document.querySelectorAll('.social-share a')]
  
    socialLinks.forEach((socialLink) => {
      socialLink.addEventListener('click', (event)=> {
        const socialAction = socialLink.dataset.action
        const socialTarget = window.location.toString()
        window.dataLayer.push({
          'event': 'social-share',
          socialAction, //social network
          socialTarget
          });
      })
    })
  })(document)