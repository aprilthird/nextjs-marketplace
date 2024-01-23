"use client";

import React, { Fragment, useEffect, useState } from "react";
import Category from "@/lib/models/category";
import { Controller, useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import ReactSelect from "react-select";
import UserService from "@/lib/services/user";
import { User } from "next-auth/core/types";
import { toastMessage } from "@/lib/utils/toast";
import Spinner from "../../ui/spinner";

type Props = {
  categories: Category[];
};

const ProfileForm = ({ categories }: Props) => {
  const session = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const { control, formState, reset, handleSubmit, watch, setError } =
    useForm<User>({
      defaultValues: session.data?.user,
    });
  const fields = watch();
  const { isValid, dirtyFields, errors } = formState;

  const [parentCategories, setParentCategories] = useState<any>([]);
  const [childCategories, setChildCategories] = useState<any>([]);

  const onSubmit = async () => {
    console.log(fields);
    try {
      setIsLoading(true);
      if (session.data) {
        await UserService.updateProfile(session.data, fields);
        console.log(fields);
        // await session.update(fields);
        await session.update({
          user: {
            categoryId: fields.categoryId,
            subCategoryId: fields.subCategoryId,
            description: fields.description,
          },
        });
        toastMessage("success", "Se guardaron los cambios");
      }
    } catch (err) {
      console.error(err);
      toastMessage("error", "Ha ocurrido un error: " + err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setParentCategories(
      categories
        .filter((x) => x.parentId === 0)
        .map((x) => ({ value: x.id, label: x.label }))
    );
  }, [categories]);

  useEffect(() => {
    setChildCategories(
      categories
        .filter((x) => x.parentId === fields.categoryId)
        .map((x) => ({ value: x.id, label: x.label }))
    );
  }, [fields.categoryId, categories]);

  useEffect(() => {
    if (session.status === "authenticated") {
      reset({ ...session.data.user });
    }
  }, [session, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="m-4 flex flex-col space-y-2">
        <div className="text-primary font-bold">Categoría</div>
        <Controller
          control={control}
          name="categoryId"
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <ReactSelect
              className="font-medium text-14"
              options={parentCategories}
              ref={ref}
              onChange={(val: any) => onChange(val.value)}
              value={parentCategories.find(
                (x: any) => x.value == fields.categoryId
              )}
            />
          )}
        />
        {/* // <DefaultDropdown
      //   buttonClassName="border"
      //   optionsClassName="w-full"
      //   items={parentCategories}
      //   value={parentCategories.find((x) => x.id == fields.categoryId)}
      //   // onChange={setParentCategories}
      // /> */}
        <div className="text-primary font-bold">Sub Categoría</div>
        <Controller
          control={control}
          name="subCategoryId"
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <ReactSelect
              className="font-medium text-14"
              options={childCategories}
              ref={ref}
              onChange={(val: any) => onChange(val.value)}
              value={childCategories.find(
                (x: any) => x.value == fields.subCategoryId
              )}
            />
          )}
        />
        <div className="text-primary font-bold">Descripción</div>
        <Controller
          control={control}
          name="description"
          render={({ field }) => (
            <textarea
              {...field}
              className="border-2 rounded-lg p-2"
              placeholder="Descripción"
              // value={fields.description}
            ></textarea>
          )}
        />
        {isLoading ? (
          <div className="flex justify-center">
            <Spinner />
          </div>
        ) : (
          <button
            type="submit"
            className="w-full mt-2 text-white bg-primary font-bold rounded-lg px-5 py-2.5 hover:bg-primary-dark focus:ring-2 focus:outline-none focus:ring-primary"
          >
            Guardar
          </button>
        )}
      </div>
    </form>
  );
};

export default ProfileForm;
