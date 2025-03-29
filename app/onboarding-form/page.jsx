"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { submitForm } from "@/app/actions";
import { ChevronRight, ChevronUp, ChevronDown } from "lucide-react";
import FormInactive from "../components/FormInactive";

export default function OnboardingForm() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    whatsapp: "",
    occupation: "",
    course: "",
    semester: "",
    income: "",
    goal: [],
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState({
    loading: false,
    error: null,
  });
  const [formActive, setFormActive] = useState(true);
  const [checkingStatus, setCheckingStatus] = useState(true);

  // Check if the form is active
  useEffect(() => {
    const checkFormStatus = async () => {
      try {
        setCheckingStatus(true);
        const response = await fetch(
          "/api/form-status?form_type=onboarding-form"
        );
        const data = await response.json();

        if (response.ok && data.success) {
          setFormActive(data.is_active);
        } else {
          // If there's an error, assume the form is active
          console.error("Error checking form status:", data.error);
          setFormActive(true);
        }
      } catch (error) {
        console.error("Error checking form status:", error);
        setFormActive(true);
      } finally {
        setCheckingStatus(false);
      }
    };

    checkFormStatus();
  }, []);

  // Define base questions
  const baseQuestions = [
    {
      id: "fullName",
      title: "Your Full Name",
      component: (
        <div className="space-y-4 w-full">
          <Input
            id="fullName"
            placeholder="Your answer goes here"
            value={formData.fullName}
            onChange={(e) => handleChange("fullName", e.target.value)}
            className={cn(
              "border-0 border-b-2 rounded-none px-0 py-0 pb-[8px] text-[24px] text-[#5c5c5c] leading-[32px] w-full focus-visible:ring-0 focus-visible:border-[#37404A] transition-colors placeholder:text-[#37404A80]",
              "!pl-0 !pr-0 !m-0",
              errors.fullName ? "border-red-500" : "border-gray-300"
            )}
            style={{
              paddingLeft: 0,
              paddingRight: 0,
              marginLeft: 0,
              marginRight: 0,
            }}
            autoFocus
          />
          {errors.fullName && (
            <p className="text-sm text-red-500">{errors.fullName}</p>
          )}
        </div>
      ),
    },
    {
      id: "email",
      title: "Your Email Address",
      component: (
        <div className="space-y-4 w-full">
          <Input
            id="email"
            type="email"
            placeholder="Your answer goes here..."
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            className={cn(
              "border-0 border-b-2 rounded-none px-0 py-0 pb-[8px] text-[24px] leading-[32px] w-full focus-visible:ring-0 focus-visible:border-[#37404A] transition-colors placeholder:text-[#37404A80]",
              "!pl-0 !pr-0 !m-0",
              errors.email ? "border-red-500" : "border-gray-300"
            )}
            style={{
              paddingLeft: 0,
              paddingRight: 0,
              marginLeft: 0,
              marginRight: 0,
            }}
            autoFocus
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email}</p>
          )}
        </div>
      ),
    },
    {
      id: "whatsapp",
      title: "Your WhatsApp Number",
      component: (
        <div className="space-y-4 w-full">
          <Input
            id="whatsapp"
            type="tel"
            placeholder="Your answer goes here..."
            value={formData.whatsapp}
            onChange={(e) => {
              // Only allow numbers
              const value = e.target.value.replace(/[^0-9]/g, "");
              handleChange("whatsapp", value);
            }}
            className={cn(
              "border-0 border-b-2 rounded-none px-0 py-0 pb-[8px] text-[24px] leading-[32px] w-full focus-visible:ring-0 focus-visible:border-[#37404A] transition-colors placeholder:text-[#37404A80]",
              "!pl-0 !pr-0 !m-0",
              errors.whatsapp ? "border-red-500" : "border-gray-300"
            )}
            style={{
              paddingLeft: 0,
              paddingRight: 0,
              marginLeft: 0,
              marginRight: 0,
            }}
            autoFocus
          />
          {errors.whatsapp && (
            <p className="text-sm text-red-500">{errors.whatsapp}</p>
          )}
        </div>
      ),
    },
    {
      id: "occupation",
      title: "What do you currently do?",
      component: (
        <div className="space-y-4 w-full">
          <RadioGroup
            value={formData.occupation}
            onValueChange={(value) => handleChange("occupation", value)}
            className={cn("space-y-3")}
          >
            <div
              className={cn(
                "flex items-center p-3 border-2 rounded-lg transition-colors",
                formData.occupation === "student"
                  ? "border-[#37404A] bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              )}
            >
              <RadioGroupItem
                value="student"
                id="student-option"
                className="mr-3"
              />
              <Label htmlFor="student-option" className="w-full cursor-pointer">
                Student
              </Label>
            </div>
            <div
              className={cn(
                "flex items-center p-3 border-2 rounded-lg transition-colors",
                formData.occupation === "working-professional"
                  ? "border-[#37404A] bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              )}
            >
              <RadioGroupItem
                value="working-professional"
                id="working-professional-option"
                className="mr-3"
              />
              <Label
                htmlFor="working-professional-option"
                className="w-full cursor-pointer"
              >
                Working Professional
              </Label>
            </div>
            <div
              className={cn(
                "flex items-center p-3 border-2 rounded-lg transition-colors",
                formData.occupation === "college-passout"
                  ? "border-[#37404A] bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              )}
            >
              <RadioGroupItem
                value="college-passout"
                id="college-passout-option"
                className="mr-3"
              />
              <Label
                htmlFor="college-passout-option"
                className="w-full cursor-pointer"
              >
                College Passout
              </Label>
            </div>
          </RadioGroup>
          {errors.occupation && (
            <p className="text-sm text-red-500">{errors.occupation}</p>
          )}
        </div>
      ),
    },
  ];

  // Questions for students
  const studentQuestions = [
    {
      id: "course",
      title: "What course are you pursuing?",
      component: (
        <div className="space-y-4 w-full">
          <RadioGroup
            value={formData.course}
            onValueChange={(value) => handleChange("course", value)}
            className={cn("space-y-3")}
          >
            <div
              className={cn(
                "flex items-center p-3 border-2 rounded-lg transition-colors",
                formData.course === "btech"
                  ? "border-[#37404A] bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              )}
            >
              <RadioGroupItem
                value="btech"
                id="btech-option"
                className="mr-3"
              />
              <Label htmlFor="btech-option" className="w-full cursor-pointer">
                B.Tech
              </Label>
            </div>
            <div
              className={cn(
                "flex items-center p-3 border-2 rounded-lg transition-colors",
                formData.course === "mca"
                  ? "border-[#37404A] bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              )}
            >
              <RadioGroupItem value="mca" id="mca-option" className="mr-3" />
              <Label htmlFor="mca-option" className="w-full cursor-pointer">
                MCA
              </Label>
            </div>
            <div
              className={cn(
                "flex items-center p-3 border-2 rounded-lg transition-colors",
                formData.course === "bca"
                  ? "border-[#37404A] bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              )}
            >
              <RadioGroupItem value="bca" id="bca-option" className="mr-3" />
              <Label htmlFor="bca-option" className="w-full cursor-pointer">
                BCA
              </Label>
            </div>
            <div
              className={cn(
                "flex items-center p-3 border-2 rounded-lg transition-colors",
                formData.course === "other"
                  ? "border-[#37404A] bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              )}
            >
              <RadioGroupItem
                value="other"
                id="course-other-option"
                className="mr-3"
              />
              <Label
                htmlFor="course-other-option"
                className="w-full cursor-pointer"
              >
                Other
              </Label>
            </div>
          </RadioGroup>
          {errors.course && (
            <p className="text-sm text-red-500">{errors.course}</p>
          )}
        </div>
      ),
    },
    {
      id: "semester",
      title: "Which semester are you in?",
      component: (
        <div className="space-y-4 w-full">
          <RadioGroup
            value={formData.semester}
            onValueChange={(value) => handleChange("semester", value)}
            className={cn("space-y-3")}
          >
            <div
              className={cn(
                "flex items-center p-3 border-2 rounded-lg transition-colors",
                formData.semester === "1st"
                  ? "border-[#37404A] bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              )}
            >
              <RadioGroupItem value="1st" id="semester-1st" className="mr-3" />
              <Label htmlFor="semester-1st" className="w-full cursor-pointer">
                1st Semester
              </Label>
            </div>
            <div
              className={cn(
                "flex items-center p-3 border-2 rounded-lg transition-colors",
                formData.semester === "2nd"
                  ? "border-[#37404A] bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              )}
            >
              <RadioGroupItem value="2nd" id="semester-2nd" className="mr-3" />
              <Label htmlFor="semester-2nd" className="w-full cursor-pointer">
                2nd Semester
              </Label>
            </div>
            <div
              className={cn(
                "flex items-center p-3 border-2 rounded-lg transition-colors",
                formData.semester === "3rd"
                  ? "border-[#37404A] bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              )}
            >
              <RadioGroupItem value="3rd" id="semester-3rd" className="mr-3" />
              <Label htmlFor="semester-3rd" className="w-full cursor-pointer">
                3rd Semester
              </Label>
            </div>
            <div
              className={cn(
                "flex items-center p-3 border-2 rounded-lg transition-colors",
                formData.semester === "4th"
                  ? "border-[#37404A] bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              )}
            >
              <RadioGroupItem value="4th" id="semester-4th" className="mr-3" />
              <Label htmlFor="semester-4th" className="w-full cursor-pointer">
                4th Semester
              </Label>
            </div>
            <div
              className={cn(
                "flex items-center p-3 border-2 rounded-lg transition-colors",
                formData.semester === "other"
                  ? "border-[#37404A] bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              )}
            >
              <RadioGroupItem
                value="other"
                id="semester-other"
                className="mr-3"
              />
              <Label htmlFor="semester-other" className="w-full cursor-pointer">
                Other
              </Label>
            </div>
          </RadioGroup>
          {errors.semester && (
            <p className="text-sm text-red-500">{errors.semester}</p>
          )}
        </div>
      ),
    },
  ];

  // Questions for working professionals
  const workingProfessionalQuestions = [
    {
      id: "income",
      title: "How much do you earn?",
      component: (
        <div className="space-y-4 w-full">
          <RadioGroup
            value={formData.income}
            onValueChange={(value) => handleChange("income", value)}
            className={cn("space-y-3")}
          >
            <div
              className={cn(
                "flex items-center p-3 border-2 rounded-lg transition-colors",
                formData.income === "0-30k"
                  ? "border-[#37404A] bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              )}
            >
              <RadioGroupItem
                value="0-30k"
                id="income-0-30k"
                className="mr-3"
              />
              <Label htmlFor="income-0-30k" className="w-full cursor-pointer">
                0-30k
              </Label>
            </div>
            <div
              className={cn(
                "flex items-center p-3 border-2 rounded-lg transition-colors",
                formData.income === "30-50k"
                  ? "border-[#37404A] bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              )}
            >
              <RadioGroupItem
                value="30-50k"
                id="income-30-50k"
                className="mr-3"
              />
              <Label htmlFor="income-30-50k" className="w-full cursor-pointer">
                30-50k
              </Label>
            </div>
            <div
              className={cn(
                "flex items-center p-3 border-2 rounded-lg transition-colors",
                formData.income === "50k-1lakh"
                  ? "border-[#37404A] bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              )}
            >
              <RadioGroupItem
                value="50k-1lakh"
                id="income-50k-1lakh"
                className="mr-3"
              />
              <Label
                htmlFor="income-50k-1lakh"
                className="w-full cursor-pointer"
              >
                50k-1Lakh
              </Label>
            </div>
          </RadioGroup>
          {errors.income && (
            <p className="text-sm text-red-500">{errors.income}</p>
          )}
        </div>
      ),
    },
  ];

  // Goal question components based on occupation
  const getGoalQuestion = () => {
    return {
      id: "goal",
      title:
        "Why did you enroll in the 'How to CSS Bootcamp'? What do you want to achieve?",
      description: "Select all that apply",
      component: (
        <div className="space-y-4 w-full">
          {formData.occupation === "student" && (
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="learn-css"
                  checked={formData.goal.includes("learn-css")}
                  onCheckedChange={(checked) => {
                    handleCheckboxChange("goal", "learn-css", checked);
                  }}
                />
                <label
                  htmlFor="learn-css"
                  className="text-[18px] leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Just to learn CSS
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="first-job"
                  checked={formData.goal.includes("first-job")}
                  onCheckedChange={(checked) => {
                    handleCheckboxChange("goal", "first-job", checked);
                  }}
                />
                <label
                  htmlFor="first-job"
                  className="text-[18px] leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Get my first job as a frontend developer
                </label>
              </div>
            </div>
          )}

          {formData.occupation === "working-professional" && (
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="learn-css"
                  checked={formData.goal.includes("learn-css")}
                  onCheckedChange={(checked) => {
                    handleCheckboxChange("goal", "learn-css", checked);
                  }}
                />
                <label
                  htmlFor="learn-css"
                  className="text-[18px] leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Just to learn CSS
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="career-switch"
                  checked={formData.goal.includes("career-switch")}
                  onCheckedChange={(checked) => {
                    handleCheckboxChange("goal", "career-switch", checked);
                  }}
                />
                <label
                  htmlFor="career-switch"
                  className="text-[18px] leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Make a career switch
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="salary-hike"
                  checked={formData.goal.includes("salary-hike")}
                  onCheckedChange={(checked) => {
                    handleCheckboxChange("goal", "salary-hike", checked);
                  }}
                />
                <label
                  htmlFor="salary-hike"
                  className="text-[18px] leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Get a salary hike
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="restart-career"
                  checked={formData.goal.includes("restart-career")}
                  onCheckedChange={(checked) => {
                    handleCheckboxChange("goal", "restart-career", checked);
                  }}
                />
                <label
                  htmlFor="restart-career"
                  className="text-[18px] leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Restart my career
                </label>
              </div>
            </div>
          )}

          {formData.occupation === "college-passout" && (
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="learn-css"
                  checked={formData.goal.includes("learn-css")}
                  onCheckedChange={(checked) => {
                    handleCheckboxChange("goal", "learn-css", checked);
                  }}
                />
                <label
                  htmlFor="learn-css"
                  className="text-[18px] leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Just to learn CSS
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="first-job"
                  checked={formData.goal.includes("first-job")}
                  onCheckedChange={(checked) => {
                    handleCheckboxChange("goal", "first-job", checked);
                  }}
                />
                <label
                  htmlFor="first-job"
                  className="text-[18px] leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Get my first job as a frontend developer
                </label>
              </div>
            </div>
          )}
          {errors.goal && <p className="text-sm text-red-500">{errors.goal}</p>}
        </div>
      ),
    };
  };

  // Get the current set of questions based on user's responses
  const getQuestions = () => {
    // Start with base questions
    let allQuestions = [...baseQuestions];

    // If user has selected an occupation
    if (formData.occupation) {
      if (formData.occupation === "student") {
        // For students, add course and semester questions
        allQuestions = [...allQuestions, ...studentQuestions];
      } else if (formData.occupation === "working-professional") {
        // For working professionals, add income question
        allQuestions = [...allQuestions, ...workingProfessionalQuestions];
      }
      // For college passout, no additional questions

      // Add the goal question for all occupations
      allQuestions.push(getGoalQuestion());
    }

    return allQuestions;
  };

  const handleChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });

    // Clear error when user types
    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: "",
      });
    }
  };

  const handleCheckboxChange = (field, value, checked) => {
    let newValues = [...(formData[field] || [])];

    if (checked) {
      if (!newValues.includes(value)) {
        newValues.push(value);
      }
    } else {
      newValues = newValues.filter((item) => item !== value);
    }

    setFormData({
      ...formData,
      [field]: newValues,
    });

    // Clear error when user makes a selection
    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: "",
      });
    }
  };

  const validateStep = () => {
    const questions = getQuestions();
    const currentQuestion = questions[step];
    const field = currentQuestion.id;

    if (field === "goal") {
      if (!formData[field] || formData[field].length === 0) {
        setErrors({
          ...errors,
          [field]: "Please select at least one option",
        });
        return false;
      }
    } else if (!formData[field] || formData[field].trim() === "") {
      setErrors({
        ...errors,
        [field]: "This field is required",
      });
      return false;
    }

    // Email validation
    if (field === "email" && !/^\S+@\S+\.\S+$/.test(formData.email)) {
      setErrors({
        ...errors,
        email: "Please enter a valid email address",
      });
      return false;
    }

    // Phone validation
    if (
      field === "whatsapp" &&
      !/^\+?[0-9\s]{10,15}$/.test(formData.whatsapp)
    ) {
      setErrors({
        ...errors,
        whatsapp: "Please enter a valid phone number",
      });
      return false;
    }

    return true;
  };

  const validateCurrentStep = () => {
    const questions = getQuestions();
    const currentQuestion = questions[step];
    const field = currentQuestion.id;

    if (field === "goal") {
      if (!formData[field] || formData[field].length === 0) {
        return false;
      }
    } else if (!formData[field] || formData[field].trim() === "") {
      return false;
    }

    // Email validation
    if (field === "email" && !/^\S+@\S+\.\S+$/.test(formData.email)) {
      return false;
    }

    // Phone validation
    if (
      field === "whatsapp" &&
      !/^\+?[0-9\s]{10,15}$/.test(formData.whatsapp)
    ) {
      return false;
    }

    return true;
  };

  const handleNext = async () => {
    if (validateStep()) {
      const questions = getQuestions();
      if (step < questions.length - 1) {
        setStep(step + 1);
      } else {
        // Form submission logic
        setSubmissionStatus({ loading: true, error: null });

        try {
          console.log("Submitting form data:", formData);

          // Use the server action to submit the form
          const result = await submitForm({
            fullName: formData.fullName,
            email: formData.email,
            whatsapp: formData.whatsapp,
            occupation: formData.occupation,
            course: formData.course || null,
            semester: formData.semester || null,
            income: formData.income || null,
            goal: formData.goal || [],
            form_type: "onboarding-form",
          });

          console.log("Form submission result:", result);

          if (!result.success) {
            // Check if the form is inactive
            if (result.formInactive) {
              setFormActive(false);
              throw new Error(
                "This form is currently not accepting submissions."
              );
            }
            throw new Error(result.error || "Unknown error occurred");
          }

          setIsSubmitted(true);
        } catch (error) {
          console.error("Error submitting form:", error);
          setSubmissionStatus({
            loading: false,
            error: `Failed to submit form: ${error.message}`,
          });
        }
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleNext();
    }
  };

  const handlePrevious = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const questions = getQuestions();
  const currentQuestion = questions[step];

  // If the form is inactive, show the inactive message
  if (!formActive && !checkingStatus) {
    return <FormInactive formTitle="How to CSS Bootcamp Onboarding" />;
  }

  // If checking status, show loading
  if (checkingStatus) {
    return (
      <div className="h-[100dvh] w-full flex flex-col justify-center items-center bg-white font-karla font-normal overflow-hidden">
        <p className="text-[18px] text-[#37404AB3]">Loading...</p>
      </div>
    );
  }

  // If the form is submitted, show the thank you message
  if (isSubmitted) {
    return (
      <div
        className="h-[100dvh] w-full flex flex-col justify-center items-center bg-white font-karla font-normal overflow-hidden"
        style={{ fontFamily: "'Karla', sans-serif" }}
      >
        <div className="w-full max-w-md flex flex-col justify-center px-4">
          <div className="w-full text-left">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4 sm:space-y-6"
            >
              <h2
                className="text-[30px] font-[500] leading-[36px] text-[#37404A] mb-[20px]"
                style={{ margin: "0px 0px 20px" }}
              >
                Thank you {formData.fullName.split(" ")[0]}!
              </h2>

              <p className="text-[18px] leading-[28px] text-[#37404AB3]">
                Your onboarding form for the CSS Bootcamp has been submitted
                successfully.
              </p>

              <p className="text-[18px] leading-[28px] text-[#37404AB3]">
                We're excited to have you join us on this learning journey.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="h-[100dvh] w-full flex flex-col justify-center items-center bg-white font-karla font-normal overflow-hidden mt-[-2.75vh] relative"
      style={{ fontFamily: "'Karla', sans-serif" }}
    >
      <div className="w-full max-w-[628px] flex flex-col justify-center px-4">
        <div className="w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-3 sm:space-y-4"
              onKeyDown={handleKeyPress}
            >
              <div className="space-y-1 sm:space-y-2">
                <p className="text-[14px] sm:text-[16px] leading-[20px] sm:leading-[24px] text-[#37404A80] font-normal">
                  Question {step + 1} <span className="text-red-500">*</span>
                </p>
                <h2 className="text-[18px] sm:text-[20px] mb-9 md:text-[24px] leading-[24px] sm:leading-[28px] md:leading-[32px] text-[#37404a] font-medium">
                  {currentQuestion.title}
                </h2>
                {currentQuestion.description && (
                  <p className="text-[14px] sm:text-[16px] leading-[20px] sm:leading-[24px] text-[#37404A80] font-normal -mt-6 mb-3">
                    {currentQuestion.description}
                  </p>
                )}
              </div>

              <div className="py-1">{currentQuestion.component}</div>

              <div className="flex justify-start pt-2">
                <Button
                  onClick={handleNext}
                  className="bg-[#37404A] hover:bg-[#37404acc] text-white text-[18px] leading-[28px] py-[6px] px-[20px] rounded-[6px] font-karla font-medium cursor-pointer"
                  disabled={submissionStatus.loading}
                >
                  {submissionStatus.loading ? (
                    <span>Submitting...</span>
                  ) : (
                    <span className="flex items-center">
                      {step === questions.length - 1 ? "Submit" : "Next"}
                      {step !== questions.length - 1 && (
                        <ChevronRight className="ml-4 h-5 w-5" />
                      )}
                    </span>
                  )}
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation buttons at the bottom right */}
      <div className="fixed bottom-6 right-6 flex shadow-md">
        <Button
          onClick={handlePrevious}
          disabled={step === 0}
          className="bg-[#37404A] hover:bg-[#37404acc] text-white rounded-l-[6px] rounded-r-none py-[6px] px-[12px] font-karla font-medium cursor-pointer border-r border-r-[#ffffff33]"
          aria-label="Previous question"
        >
          <ChevronUp className="h-5 w-5" />
        </Button>
        <Button
          onClick={handleNext}
          disabled={submissionStatus.loading || !validateCurrentStep()}
          className="bg-[#37404A] hover:bg-[#37404acc] text-white rounded-l-none rounded-r-[6px] py-[6px] px-[12px] font-karla font-medium cursor-pointer"
          aria-label={
            step === questions.length - 1 ? "Submit" : "Next question"
          }
        >
          {submissionStatus.loading ? (
            <span>...</span>
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* Error message if submission fails */}
      {submissionStatus.error && (
        <div className="text-red-500 text-center w-full mt-4 mb-2">
          {submissionStatus.error}
        </div>
      )}
    </div>
  );
}
