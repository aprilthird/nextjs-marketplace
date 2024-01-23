import MiQuryDeleteAccountForm from "@/lib/components/miqury/delete-account-form";

const DeleteAccountPage = () => {
  return (
    <div className="h-full m-4">
      <div>
        Al eliminar tu cuenta borraremos todos tus datos personales, incluidos
        tu datos sesión, tus métodos de cobro / pago y tu tienda dejará de
        serser visible para los demás usuarios.
      </div>
      <div className="mt-2">
        Solo mantendremos los datos de las compras o ventas por razones de
        historial y posibles reclamos futuros.
      </div>
      <div className="mt-2">
        Recuerda que el proceso puede durar hasta 72 horas en completarse porque
        incluye múltiples acciones en nuestro sistema y no debes tener ningún
        pedido de compra o venta activo. Recuerda que este proceso es
        irreversible y de querer volver a usar qury tendrás que crearte un nuevo
        usuario pero todos tus datos tendrán que ser ingresados nuevamente
        incluido tu tienda.
      </div>
      <div className="mt-2">
        Para eliminar tu cuenta ingresa el mensaje “acepto eliminar mi cuenta
        qury” en el siguiente campo de texto y presiona el botón eliminar
        cuenta.
      </div>
      <MiQuryDeleteAccountForm />
    </div>
  );
};

export default DeleteAccountPage;
