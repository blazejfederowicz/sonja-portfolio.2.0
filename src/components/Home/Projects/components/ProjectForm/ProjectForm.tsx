import { FormButton } from "@/common/FormButton/FormButton";
import Input from "@/common/Input/Input";
import { CONTENT, CONTENT_TEXT, PROJECT_FORM_ID, PROJECT_FORM_INPUTS } from "@/constants";
import useForm from "@/hooks/useForm/useForm";
import { fileToBase64 } from "@/lib/getFormHelpers";
import { DialogTitle } from "@headlessui/react";
import useProject from "@/hooks/useProject/useProject";
import { ContentItem, Project } from "@/types/common";


export default function ProjectForm() {
  const { state, error, handleChange, handleSubmit, setState } =
    useForm<Project>({
      project_id: crypto.randomUUID(),
      thumbnail: "",
      tag: "",
      title: "",
      short_description: "",
      height: 200,
      content: [],
    });
  const { addProject } = useProject()

  const handleClick = () => {
    const newContent: ContentItem = {
      id: crypto.randomUUID(),
      image: null,
      name: "",
      bgColor: "",
      content: "",
      isReverse: false,
    };

    setState((prev) => ({
      ...prev,
      content: [...prev.content, newContent],
    }));
  };

  const handleContentChange = async (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
    contentId: string,
    field: keyof ContentItem
  ) => {
    let value: string | boolean | null = e.currentTarget.value;
    const files = (e.currentTarget as HTMLInputElement).files;

    if (e.currentTarget instanceof HTMLInputElement) {
      if (e.currentTarget.type === "checkbox") {
        value = e.currentTarget.checked;
      } else if (files && files[0]) {
        // value = await fileToBase64(files[0]);
        value = "test" 
      }
    }

    setState((prev) => ({
      ...prev,
      content: prev.content.map((item) =>
        item.id === contentId ? { ...item, [field]: value } : item
      ),
    }));
  };

  return (
    <form id={PROJECT_FORM_ID} onSubmit={handleSubmit(addProject)}>
        {PROJECT_FORM_INPUTS.map((input, index) => (
            <Input
              key={`form-${index}`} {...input}
              {...(input.type !== "file" && {
                  value: state[input.id as keyof Omit<typeof state, "content">],
              })}
              onChange={handleChange}
              error={error[input.id as keyof typeof error]}
            />
        ))}

        <div className="mt-2">
            <DialogTitle as="h3" className="text-lg font-semibold tracking-wider">
            {CONTENT}
            </DialogTitle>

            {state.content.map((item, index) => (
            <div key={item.id} className={`mb-4 ${index !== state.content.length-1? "border-b-2" :""} border-salmon`}>
                <Input
                type="file"
                label="Content Image"
                onChange={(e) => handleContentChange(e, item.id, "image")}
                />
                <Input
                type="text"
                label="Content Name"
                value={item.name}
                onChange={(e) => handleContentChange(e, item.id, "name")}
                />
                <Input
                    as="select"
                    label="Background"
                    value={item.bgColor}
                    options={[
                        { value: "bg-white-almost", name: "Standard" },
                        { value: "bg-neutral-300", name: "Neutral" },
                    ]}
                    onChange={(e) => handleContentChange(e, item.id, "bgColor")}
                />
                <Input
                    as="textarea"
                    label="Content Description"
                    value={item.content}
                    onChange={(e) => handleContentChange(e, item.id, "content")}
                />
                <Input
                    type="checkbox"
                    label="Would you like an image before content?"
                    checked={item.isReverse}
                    onChange={(e) => handleContentChange(e, item.id, "isReverse")}
                />
            </div>
            ))}

            <FormButton
                type="button"
                text={CONTENT_TEXT}
                icon="bi bi-plus text-xl"
                click={handleClick}
            />
        </div>
    </form>
  );
}


