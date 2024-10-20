import MetricLayoutTemplate from "../../../../components/MetricLayoutTemplate";
import { useEffect, useState, useRef } from "react";
import useSWR, { mutate } from "swr";
import axios from "axios";
import { useRouter } from "next/router";
import { ngrok, testEnv } from "../../../../components/Endpoints";
import { Fragment } from "react";
import AlertDialog from '../../../../components/AlertDialogue'

const industries = [
    "Select a department",
    "Technology",
    "Agriculture",
    "Automotive",
    "Craftmanship",
    "Entertainment",
    "Finance",
    "Hospitality",
    "Maritime,Medical",
    "Sports",
    "Teaching",
    "Technical Skills"
];

const workLocation = [
    "Select a location of work",
    "REMOTE",
    "HYBRID",
    "ON-SITE",
];

const workType = ["Select work type", "FULL TIME", "PART TIME"];

const companyTypes = [
    "Select a Company Type",
    "SME",
    "MULTINATIONAL",
    "NGO",
    "GOVERNMENT AGENCY",
];

export default function CreateAssessment({
    setToken,
    setActiveDashboard,
    setActiveState
}) {
    const initialFormDetails = {
        question: "",
        type: "",
        options: "",
        answer: ""
    }

    const [formDetails, setFormDetails] = useState(initialFormDetails)
    const [dialogue, setDialogue] = useState({ text: "", result: false, path: "", closeAlert: closeAlert })


    function closeAlert() {
        setDialogue({ text: "", result: false, path: "" })
    }

    function toSentenceCase(str) {
        if (!str) return str; // Return if the string is empty
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }

    async function submitForm(e) {
        e.preventDefault();
        const id = JSON.parse(localStorage.getItem("employer")).id
        const token = localStorage.getItem("token");
        setFormDetails({...formDetails, question: ensureQuestionMark(formDetails.question)})
        if(formDetails.options) {
            setFormDetails({...formDetails, options: formDetails.options.split(",").map((item) => item.trim())})
        }
        console.log(formDetails)

        // try {
        //     //   throw new Error("New Error")
        //     const isLogged = await axios.post(
        //         `https://nddc-api.payrail.co/api/internship-positions/employer/${id}`,
        //         formData,
        //         {
        //             headers: {
        //                 Authorization: `Bearer ${token}`,
        //             },
        //         }
        //     );
        //     // debugger
        //     if (isLogged.status === 200) {
        //         console.log("done");
        //         setDialogue({ ...dialogue, result: true, text: "Assessment created Successfully!", path: "#" })
        //         // localStorage.setItem("companyDetails", isLogged.data)
        //         // router.push("/dashboard/agency/post-internship-positions")
        //         setFormDetails(initialFormDetails)
        //     }
        // } catch (error) {
        //     // window.alert("Something went wrong, try again");
        //     setDialogue({ ...dialogue, result: false, text: "Something went wrong!", path: "" })
        //     console.error("Form error:", error);
        //     // setSubmitting(false)
        // } finally {
        //     // setSubmitting(false)
        // }
    }


    function handleFormChange(e) {
        if(e.target.name == "type") {
            setFormDetails({...formDetails, options: ""})
        }
        const { name, value } = e.target;
        setFormDetails((currentDetails) => ({
            ...currentDetails,
            [name]: value,
        }));
    }

    function ensureQuestionMark(str) {
        if (str.slice(-1) === '?') {
            return str;
        } else {
            return str + '?';
        }
    }

    function stringToArrayByComma(str) {
        if (!str.includes(",")) {
            throw new Error("Please put a comma after each item");
        }
        return str.split(",").map((item) => item.trim());
    }

    useEffect(() => {
        // setActiveTab("Post Internship Positions");
        // setLoading(false)
        setToken();
        setActiveDashboard("Post Internship Positions")
        setActiveState("0")
    }, []);



    return (
        <div className="w-full">
            <form
                className="flex borde flex-col items-center pb-[50px]"
                onSubmit={submitForm}
            >
                {/* Internship Positions Section */}
                <div className="flex flex-col rounded-[10px] border-[#2dcd7c] w-full md:w-[500px] mt-[10px] border p-[10px] gap-[5px]">
                    <h2 className="rounded-t-[10px] borde bg-[#2dcd7c] font-[600] text-[20px] text-white px-[10px] text-center">
                        QUESTION TITLE
                    </h2>
                    <div className="flex flex-col gap-[5px]">
                        <input
                            required
                            onChange={handleFormChange}
                            value={formDetails.question}
                            name="question"
                            className="pl-[10px] rounded-[10px] outline-none border border-[lightgreen] py-[5px]"
                            type="text"
                            placeholder="Enter the assessment question here"
                        />
                    </div>
                </div>

                {/* Work Environment Section */}
                <div className="flex flex-col rounded-[10px] border-[#2dcd7c] w-full md:w-[500px] mt-[10px] border p-[10px] gap-[5px]">
                    <h2 className="rounded-t-[10px] borde bg-[#2dcd7c] font-[600] text-[20px] text-white px-[10px] text-center">
                        QUESTION TYPE
                    </h2>
                    <div className="flex flex-col gap-[5px]">
                        <select
                            required
                            onChange={handleFormChange}
                            name="type"
                            value={formDetails.type}
                            className="pl-[5px] outline-none border border-[lightgreen] py-[5px] rounded-[10px]"
                        >
                            {["SELECT A QUESTION TYPE", "SINGLE CHOICE", "MULTIPLE CHOICE", "CUSTOM"].map((item, index) => (
                                <option
                                    key={item}
                                    value={index === 0 ? "" : item}
                                    disabled={index === 0}
                                >
                                    {item}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Add more sections here (Duration and Stipend, Mentorship and Supervision, etc.) */}

                {(formDetails.type === "SINGLE CHOICE" || formDetails.type === "MULTIPLE CHOICE") && (
                    <div className={`flex flex-col rounded-[10px] border-[#2dcd7c] w-full md:w-[500px] mt-[10px] border p-[10px] gap-[5px]`}>
                        <h2 className="rounded-t-[10px] borde bg-[#2dcd7c] font-[600] text-[20px] text-white px-[10px] text-center">
                            OPTIONS
                        </h2>
                        <div className="flex flex-col gap-[5px]">
                            <input
                                required
                                onChange={handleFormChange}
                                value={formDetails.options}
                                name="options"
                                className="pl-[10px] rounded-[10px] outline-none border border-[lightgreen] py-[5px]"
                                type="text"
                                placeholder="Enter answer options separated by a comma"
                            />
                        </div>
                    </div>
                )}

                {(formDetails.type === "SINGLE CHOICE" || formDetails.type === "MULTIPLE CHOICE") && (
                    <div className={`flex flex-col rounded-[10px] border-[#2dcd7c] w-full md:w-[500px] mt-[10px] border p-[10px] gap-[5px]`}>
                        <h2 className="rounded-t-[10px] borde bg-[#2dcd7c] font-[600] text-[20px] text-white px-[10px] text-center">
                            ANSWER
                        </h2>
                        <div className={`flex flex-col gap-[5px]`}>
                            <input
                                required
                                onChange={handleFormChange}
                                value={formDetails.answer}
                                name="answer"
                                className="pl-[10px] rounded-[10px] outline-none border border-[lightgreen] py-[5px]"
                                type="text"
                                placeholder={formDetails.type == "MULTIPLE CHOICE" ? "Enter all valid answers separated by a comma" : "Enter the correct answer"}
                            />
                        </div>
                    </div>
                )}

                <button className="border px-[15px] py-[5px] rounded-[7px] mt-[15px] bg-[#2dcd7c] active:bg-[#cfe1f0] text-white font-[600] text-[20px]">
                    Submit
                </button>
            </form>
            <AlertDialog props={dialogue} />
        </div>
    );
}

CreateAssessment.Layout = MetricLayoutTemplate;
