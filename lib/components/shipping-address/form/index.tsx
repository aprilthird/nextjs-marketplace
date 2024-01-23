"use client";

import Address from "@/lib/models/address";
import AddressService from "@/lib/services/address";
import { useSession } from "next-auth/react";
import React, { Fragment, useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import classNames from "classnames";
import Spinner from "@/lib/components/ui/spinner";
import { toastMessage } from "@/lib/utils/toast";
import Select, { StylesConfig } from "react-select";
import departamentos from "@/lib/utils/direcciones/departamentos.json";
import provincias from "@/lib/utils/direcciones/provincias.json";
import distritos from "@/lib/utils/direcciones/distritos.json";
import { useForm } from "react-hook-form";
import Modal from "../../ui/modal";
import { useModal } from "@/lib/providers/modal-provider";
import { CloseIcon } from "../../icons/close-icon";
import { Dialog, Transition } from "@headlessui/react";
import { useRouter } from "next/navigation";

type Props = {
  address?: Address;
  isOpen?: boolean;
  isEdit?: boolean;
  afterSubmit?: (address: Address) => void;
};

export default function ShippingAddressForm({
  address,
  isOpen = false,
  isEdit = false,
  afterSubmit,
}: Props) {
  const router = useRouter();
  const session = useSession();
  const modal = useModal();
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(isOpen);

  const { control, formState, reset, handleSubmit, watch, setError } = useForm({
    defaultValues: address,
  });
  const fields = watch();
  const { isValid, dirtyFields, errors } = formState;

  const [selectedStreet, setSelectedStreet] = useState(
    address?.street || (null as any)
  );
  const [streetNumber, setStreetNumber] = useState(address?.streetNumber || "");
  const [inside, setInside] = useState(address?.inside || "");
  const [department, setDepartment] = useState(address?.department || "");
  const [province, setProvince] = useState(address?.province || "");
  const [district, setDistrict] = useState(address?.district || "");
  const [reference, setReference] = useState(address?.reference || "");
  const [name, setName] = useState(address?.name || "");
  const [phoneNumber, setPhoneNumber] = useState(address?.phoneNumber || "");

  const [dapartamentosArray, setDepartamentosArray] =
    useState<any>(departamentos);
  const [provinciasArray, setProvinciasArray] = useState<any>(provincias);
  const [distritosArray, setDistritosArray] = useState<any>(distritos);

  const onSave = async () => {
    if (session.data) {
      if (!isValidForm()) {
        return;
      }
      try {
        const objAddress = new Address();
        if (address) {
          objAddress.id = address.id;
        }
        objAddress.streetNumber = streetNumber;
        objAddress.inside = inside;
        objAddress.department = department;
        objAddress.province = province;
        objAddress.district = district;
        objAddress.reference = reference;
        objAddress.name = name;
        objAddress.phoneNumber = phoneNumber;
        objAddress.addressType = "ENVIO";
        objAddress.userId = Number(session.data?.user.id);

        if (selectedStreet != null) {
          console.log(selectedStreet.label);
          console.log(selectedStreet.value);
          console.log(selectedStreet.id);
          objAddress.street = selectedStreet.label;
        }
        const mapsResponse = await fetch(
          "https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyDMh3RSxcHhWoZSxhaL02k0fKne6vh9w3Q&address=" +
            objAddress.street
        );
        if (mapsResponse.ok) {
          const mapsData = await mapsResponse.json();
          if (mapsData["results"].length > 0) {
            setLoading(true);
            objAddress.latitude = `${mapsData["results"][0]["geometry"]["location"]["lat"]}`;
            objAddress.longitude = `${mapsData["results"][0]["geometry"]["location"]["lng"]}`;
            if (!isEdit) {
              await AddressService.create(session.data, objAddress);
            } else {
              await AddressService.update(session.data, objAddress);
            }
            setShowForm(false);
            router.refresh();
          }
        }
      } catch (error: any) {
        toastMessage("error", error.message);
        setLoading(false);
        console.log(error);
      }
    }
  };

  const isValidForm = () => {
    if (!selectedStreet) {
      toastMessage("error", "La dirección es obligatoria.");
      return false;
    }
    if (!streetNumber) {
      toastMessage("error", "El número de puerta es obligatorio.");
      return false;
    }
    if (!department) {
      toastMessage("error", "El departamento es obligatorio.");
      return false;
    }
    if (!province) {
      toastMessage("error", "La provincia es obligatoria.");
      return false;
    }
    if (!district) {
      toastMessage("error", "El distrito es obligatorio.");
      return false;
    }
    if (!name) {
      toastMessage("error", "El nombre es obligatorio.");
      return false;
    }
    if (!phoneNumber) {
      toastMessage("error", "El teléfono de contacto es obligatorio.");
      return false;
    }

    return true;
  };

  const openModal = () => {
    setSelectedStreet(null as any);
    setStreetNumber("");
    setInside("");
    setDepartment("");
    setProvince("");
    setDistrict("");
    setReference("");
    setName("");
    setPhoneNumber("");
    setShowForm(true);
  };

  const closeModal = () => {
    setShowForm(false);
  };

  useEffect(() => {
    console.log(isOpen);
    setShowForm(isOpen);
  }, []);

  useEffect(() => {
    modal.setModalOpen(showForm);
  }, [showForm, modal]);

  return (
    <React.Fragment>
      <div
        className={classNames(
          "text-secondary font-bold my-2 cursor-pointer",
          showForm ? "hover:text-red-600" : "hover:text-primary"
        )}
        onClick={openModal}
      >
        {showForm ? "x Cerrar" : "+ Agregar nueva dirección"}
      </div>
      <Transition appear show={showForm} as={Fragment}>
        <Dialog
          as="div"
          className={classNames("relative z-20")}
          onClose={closeModal}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  className={classNames(
                    "w-full transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all max-w-xl md:p-5"
                  )}
                >
                  <div
                    className={classNames(
                      "fixed text-center w-10 top-0 rounded-full bg-gray-200 cursor-pointer m-2 p-2 z-10 left-0"
                    )}
                    onClick={closeModal}
                  >
                    <CloseIcon />
                  </div>
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  ></Dialog.Title>
                  <div className="flex flex-col mt-8 space-y-2">
                    <div className="font-bold">
                      {isEdit ? "Editar" : "Nueva"} dirección
                    </div>
                    <div className="font-medium">Dirección</div>
                    <GooglePlacesAutocomplete
                      // placeholder="Ingresa una dirección"
                      apiOptions={{ language: "es", region: "pe" }}
                      selectProps={{
                        value: selectedStreet,
                        onChange: setSelectedStreet,
                        options: isEdit ? [selectedStreet] : [],
                        defaultOptions: isEdit ? [selectedStreet] : [],
                        styles: {
                          control: (styles) => ({
                            ...styles,
                            padding: "1px",
                            border: "2px solid #e5e7eb",
                            backgroundColor: "white",
                            borderRadius: "0.5rem",
                            width: "100%",
                            boxShadow: "none",
                            ":hover": {},
                          }),
                        },
                        placeholder: "Escriba y seleccione su dirección",
                      }}
                      apiKey="AIzaSyDMh3RSxcHhWoZSxhaL02k0fKne6vh9w3Q"
                    />
                    <div className="flex space-x-2">
                      <div className="flex flex-col w-full sm:w-1/2">
                        <div className="font-medium">Número</div>
                        <input
                          className="border-2 p-2 rounded-lg w-full"
                          placeholder="Nro. de puerta"
                          defaultValue={streetNumber}
                          onChange={(e) => setStreetNumber(e.target.value)}
                        />
                      </div>
                      <div className="flex flex-col w-full sm:w-1/2">
                        <div className="font-medium">Int./Tda.</div>
                        <input
                          className="border-2 p-2 rounded-lg w-full"
                          placeholder="(Opcional)"
                          defaultValue={inside}
                          onChange={(e) => setInside(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="font-medium">Departamento</div>
                    <Select
                      onChange={(val: any) => setDepartment(val.value)}
                      options={dapartamentosArray}
                      styles={selectStyles}
                      id="departamento"
                      className="border-2 bg-white rounded-lg w-full"
                      placeholder="Departamento"
                    />
                    <div className="flex space-x-2">
                      <div className="w-full sm:w-1/2">
                        <div className="font-medium">Provincia</div>
                        <Select
                          onChange={(val: any) => setProvince(val.value)}
                          options={
                            provinciasArray[
                              dapartamentosArray.find(
                                (item: any) => item.value == department
                              )?.id_ubigeo
                            ]
                          }
                          noOptionsMessage={() => "Seleccione un departamento"}
                          styles={selectStyles}
                          id="provincias"
                          className="border-2 bg-white rounded-lg w-full"
                          placeholder="Provincias"
                        />
                      </div>
                      <div className="w-full sm:w-1/2">
                        <div className="font-medium">Distrito</div>
                        <Select
                          onChange={(val: any) => setDistrict(val.value)}
                          options={
                            distritosArray[
                              provinciasArray[
                                dapartamentosArray.find(
                                  (item: any) => item.value == department
                                )?.id_ubigeo
                              ]?.find((item: any) => item.value == province)
                                ?.id_ubigeo
                            ]
                          }
                          noOptionsMessage={() => "Seleccione una provincia"}
                          styles={selectStyles}
                          id="distritos"
                          className="border-2 bg-white rounded-lg w-full"
                          placeholder="Distritos"
                        />
                      </div>
                    </div>
                    <div className="font-medium">Referencia (Opcional)</div>
                    <input
                      className="border-2 p-2 rounded-lg w-full"
                      placeholder="Ingrese una referencia"
                      defaultValue={reference}
                      onChange={(e) => setReference(e.target.value)}
                    />
                    <div className="font-bold">Datos de la persona</div>
                    <div className="font-medium">Nombre</div>
                    <input
                      className="border-2 p-2 rounded-lg w-full"
                      placeholder="Ingrese tu nombre"
                      defaultValue={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <div className="font-medium">Teléfono de contacto</div>
                    <input
                      className="border-2 p-2 rounded-lg w-full"
                      placeholder="Ingrese tu número de teléfono"
                      defaultValue={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                    {loading ? (
                      <div className="flex justify-center">
                        <Spinner />
                      </div>
                    ) : (
                      <button
                        onClick={onSave}
                        className="p-2 bg-primary rounded-lg text-white hover:bg-primary-dark focus:bg-primary-dark focus:ring-primary w-full sm:w-auto"
                      >
                        Agregar dirección
                      </button>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </React.Fragment>
  );
}

const selectStyles: StylesConfig = {
  control: (styles) => ({
    ...styles,
    backgroundColor: "transparent",
    outlineColor: "#f05523",
    outlineWidth: "0px",
    outline: "solid",
    boxShadow: "none",
    border: 0,
  }),
};
