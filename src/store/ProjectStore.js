import { IMAGES_ROUTES } from "@/constants";


const CreateProject = (()=>{
            let index = 1
            const heights = [200,400]
            return class CreateProject{
                constructor(title,src,description,contentFirst,imageFirst,contentSecond,imageSecond,heightIndex){
                    this.index = index++
                    this.title= title;
                    this.description= description
                    this.contentFirst = contentFirst
                    this.imageFirst = imageFirst
                    this.contentSecond = contentSecond
                    this.imageSecond = imageSecond
                    this.src=src
                    this.height= heights[heightIndex]
                }
                
            }
        })();


const projectsArr = [
    new CreateProject("Urban Pavilion",IMAGES_ROUTES.project1, "A temporary pavilion designed to activate public space through light, shadow, and modularity.","This image captures the pavilion in full during a bright midday, set within a small urban plaza.\n\n The translucent panels soften the natural light, casting soft shadows that shift as the sun moves. Passersby use the structure as a shaded stop or gathering place. The open frame keeps it visually light, blending with its surroundings while still defining a distinct space.\n\n Its position in the plaza was carefully chosen to avoid disrupting pedestrian flow, while offering a welcoming, informal public moment in the middle of the city.",IMAGES_ROUTES.pavilonFirst,"This close-up focuses on one of the frame's modular joints.\n\n Here, the simplicity of construction becomes a visual statement. The panels are attached using exposed fasteners, allowing easy replacement or reconfiguration. The connection between the translucent polycarbonate and steel frame highlights the project's theme of honesty in materials — nothing is hidden or overly polished. \n\nThis image helps explain how the structure balances lightness with durability and how it's built to adapt over time.",IMAGES_ROUTES.pavilonSecond, 0),
    new CreateProject("Education Center",IMAGES_ROUTES.project2,"A learning center designed to bridge land and water through architecture.", "Seen from above, the center winds gently along the wetland edge, raised on piers to allow natural water flow. \n\nThe long, narrow footprint minimizes disturbance and mirrors the linear rhythms of the reeds and waterways. This image expresses the project’s main idea — architecture not as an object in the landscape, but as part of it. \n\nThe alignment of the building with the site’s contours also helps reduce erosion and preserve plant life below",IMAGES_ROUTES.wetlandFirst,"This interior image highlights the subtle way architecture frames the surrounding environment. \n\nThe space is quiet, with natural light entering through low windows that invite the eye downward toward the water level. The interior is stripped down: raw wood walls, metal mesh, and stone flooring. It’s not trying to impress — instead, \n\nit aims to focus attention outward. This space is about listening to the landscape rather than controlling it.",IMAGES_ROUTES.wetlandSecond,1),
    new CreateProject("Dwelling in Density",IMAGES_ROUTES.project3, "A compact housing concept that rethinks livability in high-density areas.","In this image, the building sits comfortably within a high-density neighborhood, using terraces and vertical green space to soften its massing.\n\n The facade uses a rhythm of alternating solid and void to break up the elevation. This helps it respond to surrounding architecture without mimicking it. The concept behind this image was to show that density doesn’t have to feel overwhelming; \n\nsmart massing and modest materials can create a calm, livable presence.",IMAGES_ROUTES.denistyFirst,"This second image reveals the compact interior of a single unit, showcasing a modular wall system that integrates storage, \n\nworkspace, and a fold-down bed. The ceiling height and light-reflecting surfaces make the room feel more open than it is. Every piece of furniture was designed to serve more than one function, which was key to achieving comfort without sacrificing square footage. \n\nThe photo demonstrates how spatial planning and smart detailing can overcome the limits of small living.",IMAGES_ROUTES.denistySecond,1),
]

export default projectsArr;