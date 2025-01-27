import { Generable } from '@circleci/circleci-config-sdk/dist/src/lib/Components';
import ComponentMapping from '../../mappings/ComponentMapping';
import { useStoreActions } from '../../state/Hooks';
import { InspectorDefinitionMenuNav } from '../menus/definitions/InspectorDefinitionMenu';

const Definition = (props: { data: Generable; type: ComponentMapping }) => {
  const Summary = props.type.components.summary;
  const navigateTo = useStoreActions((actions) => actions.navigateTo);
  const setDragging = useStoreActions((actions) => actions.setDragging);

  return (
    <button
      className="w-full mb-2 p-2 text-sm cursor-pointer text-left text-circle-black 
      bg-white border border-circle-gray-300 rounded-md2"
      draggable="true"
      onDragStart={(e) => {
        const type = props.type;

        if (type?.dragTarget) {
          setDragging({ dataType: type, data: props.data });
        }
      }}
      onClick={(e) => {
        // this generated object should always have a single key
        const generated = props.data.generate() as { [key: string]: object };
        const flattened = Object.entries(generated).map(([key, value]) => ({
          name: key,
          ...value,
        }))[0];

        navigateTo({
          component: InspectorDefinitionMenuNav,
          props: { editing: true, values: flattened, dataType: props.type },
        });
      }}
    >
      <Summary data={props.data} />
    </button>
  );
};

export default Definition;
