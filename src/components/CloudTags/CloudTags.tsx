import { Badge, Group, Stack, Text, Title } from '@mantine/core';
import { defaultMantineColors } from '../BadgeInputForm/BadgeInputForm';
import classes from './CloudTags.module.css';
import { ITag } from '@/pages/Home/Home.page';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const data = [
	{
		value: 'jQuery',
		count: 25,
	},
	{
		value: 'MongoDB',
		count: 18,
	},
	{
		value: 'JavaScript',
		count: 38,
	},
	{
		value: 'React',
		count: 30,
	},
	{
		value: 'Nodejs',
		count: 28,
	},
	{
		value: 'Express.js',
		count: 25,
	},
	{
		value: 'HTML5',
		count: 33,
	},
	{
		value: 'CSS3',
		count: 20,
	},
	{
		value: 'Webpack',
		count: 22,
	},
	{
		value: 'Babel.js',
		count: 7,
	},
	{
		value: 'ECMAScript',
		count: 25,
	},
	{
		value: 'Jest',
		count: 15,
	},
	{
		value: 'Mocha',
		count: 17,
	},
	{
		value: 'React Native',
		count: 27,
	},
	{
		value: 'Angular.js',
		count: 30,
	},
	{
		value: 'TypeScript',
		count: 15,
	},
	{
		value: 'Flow',
		count: 30,
	},
	{
		value: 'NPM',
		count: 11,
	},
];

const colors = defaultMantineColors;
const randomColor = () => {
	return colors[Math.floor(Math.random() * colors.length)];
};

type CloudTagsProps = {
	tags: ITag[];
};

export default function CloudTags({ tags: data }: CloudTagsProps) {
	const { t } = useTranslation();
	return (
		<Stack mb="2em">
			<Title
				className={classes.title}
				// style={{ color: '#E9ECEF' }}
				order={2}
				ml="0.7em"
				mb="0.3em"
			>
				{t('general.tags')}
			</Title>

			<Group
				style={{
					display: 'flex',
					flexWrap: 'wrap',
					gap: '1em',
				}}
				ml="1em"
			>
				{data.map((tag, index) => (
					<Link to={`/search?tag=${tag.text}`} key={tag.color+tag.text+index}>
						<Badge
							style={{
								padding: '4px 12px',
								borderRadius: '4px',
								// color: randomColor(),
							}}
							variant="outline"
							color={randomColor()}
							radius="xl"
							size="lg"
						>
							{tag.text}
						</Badge>
					</Link>
				))}
			</Group>
		</Stack>
	);
}
