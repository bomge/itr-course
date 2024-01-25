import { RichTextEditor } from '@mantine/tiptap';
import { IconColorPicker } from '@tabler/icons-react';

export default function TextRchEditor({editor}) {
	return (
		<RichTextEditor editor={editor} mt="1em" mb="-0.5m">
			<RichTextEditor.Toolbar sticky stickyOffset={60}>
				<RichTextEditor.ColorPicker
					colors={[
						'#25262b',
						'#868e96',
						'#fa5252',
						'#e64980',
						'#be4bdb',
						'#7950f2',
						'#4c6ef5',
						'#228be6',
						'#15aabf',
						'#12b886',
						'#40c057',
						'#82c91e',
						'#fab005',
						'#fd7e14',
					]}
				/>

				<RichTextEditor.ControlsGroup>
					<RichTextEditor.Control interactive={false}>
						<IconColorPicker size="1rem" stroke={1.5} />
					</RichTextEditor.Control>
					<RichTextEditor.Color color="#F03E3E" />
					<RichTextEditor.Color color="#7048E8" />
					<RichTextEditor.Color color="#1098AD" />
					<RichTextEditor.Color color="#37B24D" />
					<RichTextEditor.Color color="#F59F00" />
				</RichTextEditor.ControlsGroup>

				<RichTextEditor.UnsetColor />

				<RichTextEditor.ControlsGroup>
					<RichTextEditor.Bold />
					<RichTextEditor.Italic />
					<RichTextEditor.Underline />
					<RichTextEditor.Strikethrough />
					<RichTextEditor.Highlight />
					<RichTextEditor.Code />
				</RichTextEditor.ControlsGroup>
				<RichTextEditor.ClearFormatting />
			</RichTextEditor.Toolbar>

			<RichTextEditor.Content />
		</RichTextEditor>
	);
}
