export const findByTestAttr = (wrapper: any, val: string) => {
    return wrapper.find(`[data-test="${val}"]`);
};