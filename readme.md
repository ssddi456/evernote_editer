# 简介

此玩具用于为evernote web版添加外部md编辑器。

# 构成

编辑器使用作业部落的md编辑器，其中已整合流程图、时序图和公式。

evernote web <-> background <-> editor

存储结构：

```pre.hide + div.notice + parsed html```

其中各种svg图会被转换成png格式的dataurl进行上传。
evernote会进行进一步的转换以用于存储和各端展示。

# todos

由于输出的内容仍然使用了外链css，这会导致存储后样式丢失看起来有点搓，并且公式字体丢失而不可用。
需要parse成inline css来存储。
