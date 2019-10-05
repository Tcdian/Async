function _replacePlaceHolders(partials: any[], args: any[], placeholder: any): any [] {
  let separatorIndex = 0;
  return [
    ...partials.map((partial) => {
      if (partial === placeholder) {
        return args[separatorIndex++];
      }
      return partial;
    }),
    ...args.slice(separatorIndex),
  ];
}

export default _replacePlaceHolders;
