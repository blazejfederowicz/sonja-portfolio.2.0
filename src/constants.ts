export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export const IMAGES_ROUTES={
    project1: '/images/project1.jpg',
    project2: '/images/project2.jpg',
    project3: '/images/project3.jpg',
    pavilonFirst: '/images/pavilonFirst.jpg',
    pavilonSecond: '/images/pavilonSecon.jpg',
    denistyFirst: '/images/denistyFirst.jpg',
    denistySecond: '/images/denistySecond.jpg',
    wetlandFirst: '/images/wetlandFirst.jpg',
    wetlandSecond: '/images/wetlandSecond.jpg'
};

// Navbar
export const NAV_ROUTES=[
    {name:"Home", value:"/"},
    {name:"About", value:"#about"},
    {name:"Events", value:"#events"},
    {name:"Projects", value:"#projects"},
    {name:"Contact", value:"/contact"},
];

export const BRAND_TEXT = "Baroque"

// Footer
export const SOCIAL_LINKS=[
    {name:"Facebook", href:"https://facebook.com/"},
    {name:"Linkedin", href:"https://www.linkedin.com/in/sonja-pengili-b49265360"},
    {name:"Instagram", href:"https://www.instagram.com/"},
];

export const SOCIALS = "Socials";
export const COPYRIGHT = `©Copyright ${new Date().getFullYear()} by Sonja Pengili. All rights reserved`;
export const LINK_TEXT = "Links"

export const FOOTER_ROUTES = [
    {name:"Home", href:"/"},
    {name:"Contact", href:"/contact"},
];

// Marquee
export const MARQUEE_IMAGES=[{
        src: '/images/photoshop.svg',
        name:"Photoshop"
    },
    {
        src:'/images/indesign.svg',
        name:"InDesign"
    },
    {
        src: '/images/illustrator.svg',
        name:"Adobe illustrator"
    },
    {
        src: '/images/autocad.png',
        name:"Autocad"
    },
    {
        src: '/images/rhinoceros.svg',
        name:"Rhinoceros"
    },
    {
        src: '/images/Lumion.svg',
        name:"Lumion"
    },
    {
        src: '/images/Revit.png',
        name:"Revit"
    },
    {
        src: '/images/enscape.png',
        name:"Enscape"
    },
    {
        src: '/images/sketchup.svg',
        name:"Sketchup"
    },
];

//Project
export const PROJECT_BUTTON_TEXT = "READ MORE" ;
export const PROJECT = "PROJECT";
export const PROJECT_TAG = "ARCHITECTURAL DESIGN";

//Not Found
export const NOT_FOUND = "Not Found";

//Home
export const CONTACT_TEXT = "Contact";
export const PROJECTS_Text = "Projects";
export const HERO_TAG = "Façade";
export const SURNAME = "Pengili";
export const NAME = "Sonja";
export const HERO_PARAGRAPH = "Architecture student";
export const CV_BUTTON = "View My Portfolio";
export const PROJECTS_BUTTON = "View projects";
export const EVENTS_TEXT = "Events";

export const EVENTS =[
    {
        sideText:"urban Futures",
        title:"Urban Futures Exhibition",
        message:"Presented a mixed-use development project focused on adaptive reuse and sustainable urban growth strategies in a rapidly changing city environment. ",
        src: '/images/event1.jpg'
    },
    {
        sideText:"Student works",
        title:"Student Works Showcase 2024",
        message:"Featured conceptual models and renderings exploring minimal housing solutions, emphasizing spatial efficiency and affordability in urban contexts.",
        src: '/images/event2.jpg'
    },
    {
        sideText:"Architecture",
        title:"Architecture & Society Expo",
        message:"Exhibited research-driven design addressing community space, including a pavilion concept promoting social interaction through modular wooden structures.",
        src: '/images/event3.jpg'
    },
];

export const ABOUT = [{
        title:"Conceptual Design",
        message:"Transforming ideas into strong, creative spatial concepts."
    },
    {
        title:"Technical Drafting",
        message:"Creating precise drawings for clear construction guidance."
    },
    {
        title:"Modeling & Visualization",
        message:"Building detailed models to visualize design intent clearly."
    },
    {
        title:"Project Coordination",
        message:"Managing tasks and teams to ensure smooth project delivery."
    },
];

export const ABOUT_TEXT = "About";

//Contact

export const CONTACT_TITLE = "Get In Touch";
export const CONTACT_INFO = "Contact Information";
export const CONTACT_MESSAGE = "Send Me a Message";
export const CONTACT_TAG = "STAY CONNECTED";
export const CONTACT = "CONTACT";
export const FORM_INPUTS = [
    {id:"name", label:"Name", type:"text", placeholder:"Your name", isTextarea:false},
    {id:"email", label:"Email", type:"text", placeholder:"your.email@example.com", isTextarea:false},
    {id:"title", label:"Title", type:"text", placeholder:"Your title", isTextarea:false},
    {id:"message", label:"Message", placeholder:"Your message", isTextarea:true},
];

export const CONTACT_BUTTON = "Send Message";
export const EMAIL_TEXT = "Email";
export const EMAIL = "arch.spengili@gmail.com";
export const LOCATION_TEXT = "Location";
export const LOCATION = "Tirana, Albania";
export const SOCIAL_PROFILES = "Social Profiles"

export const CONTACT_SOCIALS = [
    {name:"Instagram", href:"https://instagram.com/", icon:"bi bi-instagram"},
    {name:"Linkedin", href:"https://www.linkedin.com/in/sonja-pengili-b49265360", icon:"bi bi-linkedin"},
    {name:"Email", href:EMAIL, icon:"bi bi-envelope"},
];

//Form

export const enum ACTION_TYPES {
  INPUT_CHANGE= "INPUT_CHANGE",
  SET_ERROR= "SET_ERROR",
  CLEAR_FORM= "CLEAR_FORM",
  SET_PENDING= "SET_PENDING",
  SET_FULLFIELD= "SET_FULLFIELD",
  SET_REJECTED= "SET_REJECTED"
}

export const ERROR_MESSAGE = (name:string) => `Valid ${name} is required`
export const FULLFIELD_MESSAGE = "Message sent!"
export const REJECTED_MESSAGE = "Something went wrong, please try again later"

//Redux
export const API={
    skills: BASE_URL+"/skills",
    events: BASE_URL+"/events",
    projects: BASE_URL+"/projects",
}