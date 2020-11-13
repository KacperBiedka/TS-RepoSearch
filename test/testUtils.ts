export const findByTestAttr = (wrapper, val: string) => {
    return wrapper.find(`[data-test="${val}"]`);
};