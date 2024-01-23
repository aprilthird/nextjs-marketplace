import { Tab, Tabs } from "@/lib/components/ui/tabs/tabs";
import BusinessForm from "@/lib/components/signup/business-form";
import PersonForm from "@/lib/components/signup/person-form";
import NewUser from "@/lib/models/new-user";

type Props = {
  newUser: NewUser;
  afterSubmit: (newUser: NewUser) => void;
  loading: boolean;
};

const GeneralForm = ({ newUser, afterSubmit, loading }: Props) => {
  return (
    <Tabs>
      <Tab label="Soy persona">
        <PersonForm
          newUser={newUser}
          afterSubmit={afterSubmit}
          loading={loading}
        />
      </Tab>
      <Tab label="Soy empresa">
        <BusinessForm
          newUser={newUser}
          afterSubmit={afterSubmit}
          loading={loading}
        />
      </Tab>
    </Tabs>
  );
};

export default GeneralForm;
