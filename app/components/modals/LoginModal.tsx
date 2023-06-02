"use client";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import { toast } from "react-hot-toast";
import Button from "../Button";
import useLoginModal from "@/app/hooks/useLoginModal";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const LoginModal = () => {
  const router = useRouter();
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    signIn("credentials", { ...data, redirect: false }).then((callback) => {
      setIsLoading(false);

      if (callback?.ok) {
        toast.success("Logged in");
        loginModal.onClose();
        router.refresh();
      }

      if (callback?.error) {
        toast.error(callback.error);
      }
    });
  };

  const toggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal]);

  // body component
  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcon back" subTitle="Login to your account" />
      <Input
        id="email"
        label="Email"
        required
        errors={errors}
        register={register}
        disabled={isLoading}
      />
      <Input
        id="password"
        type="password"
        label="Password"
        required
        errors={errors}
        register={register}
        disabled={isLoading}
      />
    </div>
  );

  // footer component
  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        label="Continue with Google"
        outline
        icon={FcGoogle}
        onClick={() => signIn("google")}
      />
      <Button
        label="Continue with Github"
        outline
        icon={AiFillGithub}
        onClick={() => signIn("github")}
      />
      <div className="flex flex-row items-center justify-center gap-2">
        <span>First time using Airbnb</span>
        <span
          onClick={toggle}
          className="hover:underline text-neutral-800 cursor-pointer"
        >
          Create an account
        </span>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Register"
      actionLabel="Continue"
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
