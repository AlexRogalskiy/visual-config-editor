import { FormikValues } from 'formik';
import JobMapping from '../../../mappings/JobMapping';
import { useStoreActions } from '../../../state/Hooks';
import { DefinitionModel } from '../../../state/Store';
import InspectorProperty from '../../atoms/form/InspectorProperty';
import ListProperty from '../../atoms/form/ListProperty';
import StepPropertiesMenu from '../../menus/definitions/StepDefinitionMenu';
import StepTypePage from '../../menus/definitions/subtypes/StepTypePage';
import SubTypeMenuNav from '../../menus/SubTypeMenu';

const JobInspector = (
  props: FormikValues & { definitions: DefinitionModel },
) => {
  const navigateTo = useStoreActions((actions) => actions.navigateTo);

  return (
    <div>
      <InspectorProperty label="Name" name="name" required />
      <InspectorProperty
        label="Executor"
        as="select"
        name="executor.name"
        required
      >
        {[{ name: 'Select Executor' }, ...props.definitions.executors].map(
          (executor) => (
            <option value={executor.name} key={executor.name}>
              {executor.name}
            </option>
          ),
        )}
      </InspectorProperty>
      <ListProperty
        label="Steps"
        name="steps"
        values={props.values.steps}
        expanded
        emptyText="No steps defined yet."
        titleExpanded={
          <button
            type="button"
            onClick={() => {
              navigateTo({
                component: SubTypeMenuNav,
                props: {
                  typePage: StepTypePage,
                  menuPage: StepPropertiesMenu,
                  passThrough: { dataType: JobMapping },
                },
                values: props.values,
              });
            }}
            className="ml-auto tracking-wide hover:underline leading-6 text-sm text-circle-blue font-medium"
          >
            New
          </button>
        }
      ></ListProperty>
    </div>
  );
};

export default JobInspector;
