import { Map } from 'immutable'
import { DefaultDraftBlockRenderMap, CompositeDecorator } from 'draft-js'
import { removeStylesHandler, blockHandler, inlineHandler } from './helpers/buttonHelper'
import icons from './views/icons'
import { linkDecorator, linkHandler } from './helpers/linkHelper'
import { imageDecorator, imageHandler } from './helpers/imageHelper'
import { RichTextProps, ButtonEntity } from './types'

export enum INLINE_STYLES {
  bold = 'BOLD',
  italic = 'ITALIC',
  underline = 'UNDERLINE',
  strikethrough = 'STRIKETHROUGH',
  color = 'COLOR',
  size = 'SIZE',
  size10 = 'SIZE10',
  size12 = 'SIZE12',
  size14 = 'SIZE14',
  size16 = 'SIZE16',
  size18 = 'SIZE18',
  size20 = 'SIZE20',
  code = 'CODE',
  link = 'LINK',
  media = 'MEDIA',
  image = 'IMAGE',
}

export const buttonEntities: ButtonEntity[] = [
  {
    label: 'Paragraph',
    style: 'p',
    showOn: 'selection',
    component: icons.ParagraphIcon,
    handler: blockHandler,
  },
  {
    label: 'Header',
    style: 'header',
    showOn: 'any',
    component: icons.HeaderIcon,
    nestedActions: [
      { label: 'Header 1', style: 'header-one', handler: blockHandler },
      { label: 'Header 2', style: 'header-two', handler: blockHandler },
      { label: 'Header 3', style: 'header-three', handler: blockHandler },
      { label: 'Header 4', style: 'header-four', handler: blockHandler },
      { label: 'Header 5', style: 'header-five', handler: blockHandler },
      { label: 'Header 6', style: 'header-six', handler: blockHandler },
    ],
  },
  { label: 'Blockquote', style: 'blockquote', component: icons.BlockquoteIcon, handler: blockHandler },
  { label: 'UL', style: 'unordered-list-item', component: icons.UnorderedListIcon, handler: blockHandler },
  { label: 'OL', style: 'ordered-list-item', component: icons.OrderedListIcon, handler: blockHandler },
  { label: 'Code Block', style: 'code-block', component: icons.PreIcon, handler: blockHandler },
  { label: 'Bold', style: INLINE_STYLES.bold, showOn: 'selection', component: icons.BoldIcon, handler: inlineHandler },
  { label: 'Italic', style: INLINE_STYLES.italic, showOn: 'selection', component: icons.ItalicIcon, handler: inlineHandler },
  { label: 'Underline', style: INLINE_STYLES.underline, showOn: 'selection', component: icons.UnderlineIcon, handler: inlineHandler },
  {
    label: 'Strikethrough',
    style: INLINE_STYLES.strikethrough,
    showOn: 'selection',
    component: icons.StrikethroughIcon,
    handler: inlineHandler,
  },
  { label: 'Link', style: INLINE_STYLES.link, showOn: 'selection', component: icons.AnchorIcon, handler: linkHandler, needsInput: true },
  {
    label: 'Image',
    style: INLINE_STYLES.image,
    showOn: 'newline',
    component: icons.ImageIcon,
    handler: inlineHandler,
    nestedActions: [{ label: 'Image from URL', style: INLINE_STYLES.image, handler: imageHandler, needsInput: true }],
  },
  { label: 'Text Color', style: INLINE_STYLES.color, showOn: 'selection', component: icons.TextColorIcon, handler: inlineHandler },
  {
    label: 'Text Size',
    style: INLINE_STYLES.size,
    showOn: 'selection',
    component: icons.TextSizeIcon,
    handler: inlineHandler,
    nestedActions: [
      { label: '10px', style: INLINE_STYLES.size10, handler: inlineHandler },
      { label: '12px', style: INLINE_STYLES.size12, handler: inlineHandler },
      { label: '14px', style: INLINE_STYLES.size14, handler: inlineHandler },
      { label: '16px', style: INLINE_STYLES.size16, handler: inlineHandler },
      { label: '18px', style: INLINE_STYLES.size18, handler: inlineHandler },
      { label: '20px', style: INLINE_STYLES.size20, handler: inlineHandler },
    ],
  },
  { label: 'Code', style: INLINE_STYLES.code, showOn: 'selection', component: icons.CodeIcon, handler: inlineHandler },
  { label: 'Remove Styles', style: 'remove-styles', showOn: 'selection', component: icons.UnstyledIcon, handler: removeStylesHandler },
]

export const styleMap = {
  LINK: { textDecoration: 'underline', color: 'blue' },
  SIZE10: { fontSize: '10px' },
  SIZE12: { fontSize: '12px' },
  SIZE14: { fontSize: '14px' },
  SIZE16: { fontSize: '16px' },
  SIZE18: { fontSize: '18px' },
  SIZE20: { fontSize: '20px' },
}

export const blockRenderMap = DefaultDraftBlockRenderMap.merge(
  Map({
    unstyled: {
      element: 'rt-p',
    },
  })
)

export const decorators = new CompositeDecorator([linkDecorator, imageDecorator])

export const classNames = {
  root: 'richtext-editor',
}

export const defaultProps: RichTextProps = {
  readOnly: false,
  placeholder: 'Your content here...',
  enableToolbar: true,
  classNames,
}
