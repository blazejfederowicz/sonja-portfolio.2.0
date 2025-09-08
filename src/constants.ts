export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

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
export const MARQUEE_IMAGES=[
    {
        src: '/images/autocad.png',
        name:"Autocad"
    },
    {
        src: '/images/Revit.png',
        name:"Revit"
    },
    {
        src: '/images/archicad.png',
        name: "Archicad"
    },
    {
        src: '/images/rhinoceros.svg',
        name:"Rhinoceros"
    },
    {
        src: '/images/sketchup.svg',
        name:"Sketchup"
    },
     {
        src: '/images/enscape.png',
        name:"Enscape"
    },
    {
        src: '/images/Lumion.svg',
        name:"Lumion"
    },
    {
        src: '/images/photoshop.svg',
        name:"Photoshop"
    },
    {
        src: '/images/illustrator.svg',
        name:"Adobe illustrator"
    },
    {
        src:'/images/indesign.svg',
        name:"InDesign"
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
export const PROJECTS_TEXT = "Projects";
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
export const IMAGE_PLACEHOLDER = "https://placehold.co/600x400"

//Contact

export const CONTACT_TITLE = "Get In Touch";
export const CONTACT_INFO = "Contact Information";
export const CONTACT_MESSAGE = "Send Me a Message";
export const CONTACT_TAG = "STAY CONNECTED";
export const CONTACT = "CONTACT";
export const FORM_INPUTS = [
    {id:"name", label:"Name", type:"text", placeholder:"Your name", as:"input" as "input"},
    {id:"email", label:"Email", type:"text", placeholder:"your.email@example.com", as:"input" as "input"},
    {id:"title", label:"Title", type:"text", placeholder:"Your title", as:"input" as "input"},
    {id:"message", label:"Message", placeholder:"Your message", as:"textarea" as "textarea"},
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

export const enum FORM_TYPES {
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
export const API_ROUTES={
    skills: BASE_URL+"/api/skills",
    events: BASE_URL+"/api/events",
    projects: BASE_URL+"/api/projects",
}

export const ERROR_MESSAGES = {
    FETCH_SKILLS: "Failed to fetch skills data",
    FETCH_PROJECTS: "Failed to fetch projects data",
    FETCH_EVENTS:"Failed to fetch events data"
}

export const ERROR = "Error: "
export const LOADING_TEXT = "Loading"
export const UNKNOWN_ERROR = "Unkown error"

export const enum ACTION_TYPES{
    skills = "skills/fetchSkills",
    addSkill = "skills/postSkill",
    updateSkill = "skills/updateSkill",
    removeSkill = "skills/removeSkill",
    events = "events/fetchEvents",
    addEvent = "events/postEvent",
    updateEvent = "events/updateEvent",
    removeEvent = "events/removeEvent",
    projects = "projects/fetchProjects",
    addProject = "projects/postProject",
    updateProject = "projects/updateProject",
    removeProject = "projects/removeProject",
}

//Login
export const AUTH_LOGIN = "LOGIN"
export const AUTH_MESSAGE = "Check your email for the login link!"
export const AUTH_EMAIL = "email"

//Modal
export const CANCEL = "CANCEL"
export const SAVE = "CONFIRM"
export const EDIT = "EDIT SECTION"
export const SKILL_FORM_INPUTS = [
    {id:"tag", label:"Skill Tag", type:"text", placeholder:"Skill tag", as:"input" as "input"},
    {id:"title", label:"Title", type:"text", placeholder:"Your title", as:"input" as "input"},
    {id:"short_description", label:"Description", type:"text", placeholder:"Your Description", as:"textarea" as "textarea"},
];

export const SKILL_FORM_ID = "skill_form"
export const EVENT_FORM_ID = "event_form"
export const PROJECT_FORM_ID = "project_form"
export const DELETE_SKILL_ID = "delete_skill"
export const DELETE_EVENT_ID = "delete_event"
export const DELETE_PROJECT_ID = "delete_project"

export const EVENT_FORM_INPUTS = [
    {id:"thumbnail", label:"thumbnail", type:"file", accept:"image/*", placeholder:"Thumbnail", as:"input" as "input"},
    {id:"side_text", label:"Side text", type:"text", placeholder:"Your side text", as:"input" as "input"},
    {id:"title", label:"Title", type:"text", placeholder:"Your title", as:"input" as "input"},
    {id:"short_description", label:"Description", type:"text", placeholder:"Your Description", as:"textarea" as "textarea"},
];

export const PROJECT_FORM_INPUTS = [
    {id:"tag", label:"Project Tag", type:"text", placeholder:"Project tag", as:"input" as "input"},
    {id:"thumbnail", label:"thumbnail", type:"file", accept:"image/*", placeholder:"Thumbnail", as:"input" as "input"},
    {id:"title", label:"Title", type:"text", placeholder:"Your title", as:"input" as "input"},
    {id:"short_description", label:"Description", type:"text", placeholder:"Your Description", as:"textarea" as "textarea"},
    {id:"height", label:"Thumbnail Image height", as: "select" as "select" , options:[
        {value:200, name:"200"},
        {value:400, name:"400"},
        {value:600, name:"600"},
    ]},
    
];

export const CONTENT_TEXT = "Add new content"
export const CONTENT = "Content"
export const TABLES = {
    skills:"skills",
    events:"events",
    projects:"projects"
}

//Delete
export const DELETE_PARAGRAPH = "Are you sure, that you want to remove: "
export const DELETE_HEADLINE = "Remove"
export const DELETE_BUTTON = "DELETE"
export const CHOOSE_OPTION = "Choose an option"