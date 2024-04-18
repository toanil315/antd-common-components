import { useCurrentEditor } from '@tiptap/react';
import { MenuBarSeparator, StyledButtonView, StyledMenuBar } from './styled';
import { OverflowMenu } from '../../OverflowMenu';
import HeadingPlugin, { HeadingLevel } from './plugins/HeadingPlugin';
import TextStylePlugin, { TextStyle } from './plugins/TextStylePlugin';
import LinkPlugin from './plugins/LinkPlugin';
import ImagePlugin from './plugins/ImagePlugin';
import TextAlignPlugin, { TextAlignment } from './plugins/TextAlignPlugin';
import ListPlugin, { ListType } from './plugins/ListPlugin';
import { MoreIcon } from '@/components/Icons';
import { InsertDefaultTablePlugin } from './plugins/TablePlugins';
import MediaPlugin from './plugins/MediaPlugin';
import FontFamillyPlugin from './plugins/FontFamillyPlugin';
import FontSizePlugin from './plugins/FontSizePlugin';
import FileMenu from './top-menus/FileMenu';
import EditMenu from './top-menus/EditMenu';
import ViewMenu from './top-menus/ViewMenu';
import InsertMenu from './top-menus/InsertMenu';
import FormatMenu from './top-menus/FormatMenu';

const MenuBar = () => {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  return (
    <>
      <StyledMenuBar>
        <div className='top'>
          <FileMenu />
          <EditMenu />
          <ViewMenu />
          <InsertMenu />
          <FormatMenu />
          <OverflowMenu>
            <StyledButtonView>Table</StyledButtonView>
          </OverflowMenu>
        </div>

        {/* HEADING PLUGINS */}
        <div className='bottom'>
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <HeadingPlugin
                key={index}
                level={(index + 1) as HeadingLevel}
              />
            ))}

          <div className='w-[120px]'>
            <FontFamillyPlugin />
          </div>
          <div className='w-[70px]'>
            <FontSizePlugin />
          </div>

          <MenuBarSeparator />

          {/* TEXT DECORATION STYLE PLUGINS */}
          {['bold', 'italic', 'underline', 'strike'].map((style) => (
            <TextStylePlugin
              key={style}
              style={style as TextStyle}
            />
          ))}

          {/* ELEMENTS PLUGINS */}
          <LinkPlugin />
          <MenuBarSeparator />
          <ImagePlugin />
          <InsertDefaultTablePlugin />

          <MenuBarSeparator />
          <OverflowMenu
            trigger={['click']}
            menu={{
              items: [
                // TEXT ALIGN PLUGINS
                ...['Left', 'Center', 'Right', 'Justify'].map((alignment) => ({
                  label: (
                    <TextAlignPlugin
                      key={alignment}
                      align={alignment.toLowerCase() as TextAlignment}
                    />
                  ),
                  key: alignment.toLowerCase(),
                })),

                // LIST PLUGINS
                ...['ordered', 'bullet'].map((listType) => ({
                  label: (
                    <ListPlugin
                      key={listType}
                      type={listType as ListType}
                    />
                  ),
                  key: listType,
                })),

                {
                  label: <MediaPlugin label='Media' />,
                  key: 'media',
                },
              ],
              onClick: (e) => e.domEvent.currentTarget.querySelector('button')?.click(),
            }}
          >
            <StyledButtonView>
              <MoreIcon />
            </StyledButtonView>
          </OverflowMenu>
        </div>
      </StyledMenuBar>
    </>
  );
};

export default MenuBar;
