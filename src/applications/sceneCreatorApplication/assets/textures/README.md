# 材质纹理

## 目录结构

```
textures/
├── floor/          # 地板材质
│   ├── wood.svg
│   ├── tile.svg
│   └── marble.svg
└── wall/           # 墙壁材质
    ├── brick.svg
    └── stone.svg
```

## 说明

所有材质统一为单文件，可用于内层或外层。在编辑器中通过 `texture_in`（内）和 `texture_out`（外）指定使用方式。
