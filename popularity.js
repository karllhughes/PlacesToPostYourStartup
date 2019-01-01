const fetch = require('node-fetch');
const parser = require('xml2js').parseString;

// Get the links
const links = [
  'https://www.reddit.com/r/alphaandbetausers/',
  'https://www.reddit.com/r/coupons/',
  'https://www.reddit.com/r/design_critiques/',
  'http://reddit.com/r/entrepreneur',
  'http://reddit.com/r/imadethis',
  'https://www.reddit.com/r/indiebiz/',
  'https://www.reddit.com/r/ladybusiness/',
  'https://www.reddit.com/r/roastmystartup',
  'https://www.reddit.com/r/shamelessplug/',
  'http://reddit.com/r/sideproject',
  'https://www.reddit.com/r/smallbusiness/',
  'http://reddit.com/r/startups',
  'http://www.101bestwebsites.com/',
  'https://10words.io',
  'http://www.allmyfaves.com/',
  'http://www.allstartups.info/Startups/Submit',
  'http://alltopstartups.com/submit-startup/',
  'http://alternativeto.net/',
  'https://angel.co/join',
  'http://apps400.com/',
  'http://appadvice.com/page/about-us',
  'http://www.appappeal.com/contact/suggest',
  'https://apprater.net/add/',
  'http://formstack.com/forms/envato-appstorm_review',
  'http://appcrawlr.com/',
  'http://appiod.com/submit-app-for-review/',
  'http://www.apppicker.com/',
  'http://apps400.com/submit-your-application-for-review',
  'http://appslisto.com/submit-your-app/',
  'http://appsmamma.com/submit-your-app/',
  'http://www.appsmirror.com/submit-your-app-for-review',
  'http://appsnow.us/submit-app-for-review/',
  'http://appsthunder.com/submit-your-app/',
  'http://appstorm.net/',
  'http://www.appvita.com/',
  'http://www.appzapp.net/en/app-review-request/',
  'http://arcticstartup.com/',
  'http://www.betabound.com/announce/',
  'https://betapage.co/',
  'https://www.betafy.co/easysignup/startup',
  'https://betalist.com/submit',
  'https://beterest.com/submit-startup/',
  'http://boingboing.net/sub/',
  'http://www.builtinchicago.org/send-us-tip',
  'http://www.capterra.com/vendors/sign-up',
  'http://www.cloudbook.net/directories/product-services/product-company-search.php',
  'http://www.cloudshowplace.com/add-your-company/',
  'https://upload.cnet.com/',
  'https://www.collaborizm.com',
  'http://www.crazyaboutstartups.com/index.php/share-your-startup-form',
  'https://vendor.crozdesk.com/user/signup',
  'https://www.crunchbase.com/#/home/index',
  'http://www.cssmania.com/submit/',
  'https://www.designernews.co/',
  'http://digg.com/submit',
  'http://www.discova.co/',
  'https://www.discovercloud.com/become-a-vendor',
  'https://earlystagenews.com/',
  'https://erlibird.com/beta-testing',
  'http://www.f6s.com/',
  'https://feedmyapp.com/submit/',
  'https://www.g2crowd.com/products/new',
  'http://geekwire.com/startup-list/',
  'http://getapp.com/',
  'https://getworm.com/submit-startup',
  'http://www.githustle.com',
  'https://www.gust.com',
  'https://in.thehackerstreet.com/',
  'https://www.helpareporter.com/sources/',
  'http://www.iamwire.com/startups/user/register?uType=Entrepreneur',
  'http://ideahunt.io/',
  'https://inc42.com/startup-submission/',
  'https://index.co/startup',
  'http://www.justgonelive.com/add-listing',
  'http://killerstartups.com/submit-startup/',
  'https://land-book.com/guidelines',
  'http://www.launchingnext.com/submit/',
  'https://launchlister.com/submit-startup',
  'https://launched.io/SubmitStartup',
  'https://www.makerupdates.com/',
  'http://www.makeuseof.com/about/',
  'https://maqtoob.com/submit-a-tool',
  'https://mevvy.com/submit-app/',
  'https://www.moblized.com/vendors/register',
  'https://www.netted.net/contact-us/',
  'http://nextbigproduct.net/product-submission/',
  'http://nextbigwhat.com/',
  'http://www.nibletz.com/submit-startup',
  'http://ontheapp.com/about/',
  'http://www.paggu.com/submit-your-startup/',
  'http://www.pfind.com/submit',
  'http://about.postscapes.com/tools',
  'http://www.preapps.com/',
  'http://www.producthunt.com/',
  'https://www.programmableweb.com/news/how-to-pitch-programmableweb-covering-your-news/2016/11/18',
  'https://www.publicityx.com/startups/new',
  'http://ratemystartup.com/submit-your-startup/',
  'http://www.rev2.org/',
  'http://tools.robingood.com/',
  'https://news.ycombinator.com/showhn.html',
  'https://www.sideprojectors.com',
  'http://sideprojects.web3canvas.com',
  'http://signupfirst.com/',
  'http://www.similarsitesearch.com/tips.html',
  'https://www.slant.co/',
  'https://www.snapmunk.com/submit-your-startup/',
  'https://www.softlaunched.com/',
  'https://softwareadvice-markets.questionpro.com/',
  'http://springwise.com/tipus/',
  'https://www.saashub.com/',
  'https://saasified.co',
  'http://stackshare.io/',
  'https://starthq.com/apps/submit',
  'https://starterstory.com/',
  'https://startup88.com/',
  'https://startupbase.io/submit',
  'http://startupbeat.com/startup-beat-featured-startup-pitch-guidelines/',
  'https://www.startupbenchmarks.com/',
  'http://startupbuffer.com',
  'http://startupcollections.com/',
  'http://startupdope.com/submit-news/',
  'https://www.startupinspire.com/submit',
  'http://www.startuplift.com/',
  'http://www.startupranking.com/',
  'http://startupregister.net/register-your-startup/',
  'https://startupresources.io',
  'http://startupstash.com/',
  'http://startuptabs.com/',
  'http://startup88.com/',
  'http://www.startupblink.com/',
  'http://stateoftech.net/advertise?submit-an-app-for-review',
  'https://www.tapscape.com/',
  'http://techfaster.com/submit-your-company/',
  'http://thetechmap.com/',
  'http://www.techpluto.com/submit-a-startup/',
  'http://techattitude.com/contact/',
  'https://github.com/thechangelog/ping',
  'https://www.theiphonemom.com/',
  'http://thestartuppitch.com/post-a-pitch/',
  'https://topalternatives.com/',
  'http://www.topsimilarsites.com/add.aspx',
  'https://www.trustradius.com/',
  'http://www.vator.tv/',
  'http://vbprofiles.com/',
  'http://venturebeat.com/news-tips/',
  'http://www.venturebin.com/submit-venture/',
  'http://www.webapprater.com/webapprater-free-app-review',
  'http://webmenu.org/',
  'https://news.ycombinator.com/',
  'https://ww2.younoodle.com/startups/',
  'https://profiles.yourstory.com/',
];

// Loop through each
const result = Promise.all(links.map(async link => {
  let facebookTotal = 0;
  try {
    // Get shared count for each. Key: xxx
    facebookTotal = (await fetch(
      'https://api.sharedcount.com/v1.0/?apiKey=xxx&url=' + link
    ).then(response => response.json())).Facebook.total_count;
  } catch (e) {
    //
  }

  let alexaDomain = '';
  let alexaPopularity = 0;
  let alexaRank = 0;
  try {
    // Get Alexa data: https://stackoverflow.com/questions/3676376/fetching-alexa-data/6224304#6224304
    const alexa = await fetch('http://data.alexa.com/data?cli=10&url=' + link)
      .then(response => response.text())
      .then(response => {
        return new Promise((resolve, reject) => {
          parser(response, (err, result) => {
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          })
        });
      });
    alexaDomain = alexa.ALEXA.SD[0].POPULARITY[0]['$']['URL'];
    alexaPopularity = Number(alexa.ALEXA.SD[0].POPULARITY[0]['$']['TEXT']);
    alexaRank = Number(alexa.ALEXA.SD[0].REACH[0]['$']['RANK']);
  } catch (e) {
    //
  }

  return { link, alexaDomain, alexaPopularity, alexaRank, facebookTotal };
}));

result.then(res => console.log(JSON.stringify(res))).catch(e => console.error(e));

// Save to CSV/JSON
