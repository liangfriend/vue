type laNodeType = {
  ROOT: 1;
  NORMAL: 2;
  END: 3;
};
type laNode =
  | {
      type: laNodeType['NORMAL'];
      next: laNode | null;
      data: {
        text: string | null;
      };
    }
  | {
      type: laNodeType['ROOT'];
      next: laNode;
    }
  | {
      type: laNodeType['END'];
    };
