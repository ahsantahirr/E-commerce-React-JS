import React, { useState,useContext  } from "react";
import { Button, Input, Textarea, Typography } from "@material-tailwind/react";
import { themeContext } from '../Contexts/Themecontext';

export function ContactSection14() {
  const { theme } = useContext(themeContext)
  const [formData, setFormData] = useState({
    name: "",
    lastName:"",
    email: "",
    message: ""
  })
  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = { ...formData };
    const encodedTxt = encodeURIComponent(
      `Name: ${formData.name+formData.lastName}\nE-mail: ${formData.email}\nMessage: ${formData.message}`
    );
    
    window.open(`https://wa.me/923428180120?text=${encodedTxt}`, "_blank");
    console.log(userData);
  };
  
  return (
    <section className={`px-8 py-8 lg:py-16 font-poppins ${theme ? ("bg-black text-white") : ("bg-white")}`}>
      <div className="container mx-auto text-center">
        <Typography
          variant="h5"
          color="blue-gray"
          className="mb-4 !text-base lg:!text-2xl"
        >
          Customer Care
        </Typography>
        <Typography
          variant="h1"
          color="blue-gray"
          className="mb-4 !text-3xl lg:!text-5xl"
        >
          We&apos;re Here to Help
        </Typography>
        <Typography className="mb-10 font-normal !text-lg lg:mb-20 mx-auto max-w-3xl !text-gray-500">
          Whether it&apos;s a question about our services, a request for
          technical assistance, or suggestions for improvement, our team is
          eager to hear from you.
        </Typography>
        <div className="grid grid-cols-1 gap-x-12 gap-y-6 lg:grid-cols-2 items-start">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3618.1874778581887!2d67.08742367443192!3d24.92568244264645!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33f60a0781265%3A0x2befaba123014ab1!2sSMIT%20Gulshan%20Campus!5e0!3m2!1sen!2s!4v1725482082042!5m2!1sen!2s" width="600" height="450" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="w-full h-full lg:max-h-[510px]"></iframe>


          <form
            action="#"
            className={`flex flex-col gap-4 lg:max-w-sm  ${theme ? ("bg-black text-white") : ("bg-white")}`}
            onSubmit={handleSubmit}
          >
            {/* <Typography
              variant="small"
              className="text-left !font-semibold !text-gray-600"
            >
              Select Options for Business Engagement
            </Typography>
            <div className="flex gap-4">
              <Button variant="outlined" className="max-w-fit">
                General inquiry
              </Button>
              <Button variant="outlined" className="max-w-fit">
                Product Support
              </Button>
            </div> */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Typography
                  variant="small"
                  className={`mb-2 text-left font-medium   ${theme ? ("bg-black text-white") : ("bg-white")}`}
                >
                  First Name
                </Typography>
                <Input
                  color="gray"
                  size="lg"
                  placeholder="First Name"
                  name="name"
                  className="focus:border-t-gray-900 p-2"
                  value={formData.name}
                  onChange={handleChange}
                  containerProps={{
                    className: "min-w-full",
                  }}
                  labelProps={{
                    className: "hidden",
                  }}
                />
              </div>
              <div>
                <Typography
                  variant="small"
                  className={`mb-2 text-left font-medium   ${theme ? ("bg-black text-white") : ("bg-white")}`}
                >
                  Last Name
                </Typography>
                <Input
                  color="gray"
                  size="lg"
                  placeholder="Last Name"
                  name="lastName"
                  className="focus:border-t-gray-900 p-2"
                  value={formData.lastName}
                  onChange={handleChange}
                  containerProps={{
                    className: "!min-w-full",
                  }}
                  labelProps={{
                    className: "hidden",
                  }}
                />
              </div>
            </div>
            <div>
              <Typography
                variant="small"
                className={`mb-2 text-left font-medium   ${theme ? ("bg-black text-white") : ("bg-white")}`}
              >
              Your Email
              </Typography>
              <Input
                color="gray"
                size="lg"
                placeholder="email"
                name="email"
                type="email"
                className="focus:border-t-gray-900 p-2"
                value={formData.phoneNumber}
                onChange={handleChange}
                containerProps={{
                  className: "!min-w-full",
                }}
                labelProps={{
                  className: "hidden",
                }}
              />
            </div>
            <div>
              <Typography
                variant="small"
                className={`mb-2 text-left font-medium   ${theme ? ("bg-black text-white") : ("bg-white")}`}
              >
                Your Message
              </Typography>
              <Textarea
                rows={6}
                color="gray"
                placeholder="Message"
                name="message"
                className="focus:border-t-gray-900"
                value={formData.message}
                onChange={handleChange}
                containerProps={{
                  className: "!min-w-full",
                }}
                labelProps={{
                  className: "hidden",
                }}
              />
            </div>
            <Button className={`${theme ? "bg-white text-black" : "bg-black text-white"} `}type="submit">
              Send message
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ContactSection14;