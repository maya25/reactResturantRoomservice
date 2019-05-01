export default function createAction(actionName) {
    const type = `mh-${actionName}`;
    const actionCreator = payload => ({type, ...payload});
    actionCreator.type = type;
    return actionCreator;
}
