import { Image, Container, Title } from '@mantine/core';
import heroImahe from '../../assets/659d8dca32b6e4000f1f5160.png';
import classes from './HeroBullets.module.css';

export default function HeroBullets() {
	return (
		<Container size="lg">
			<div className={classes.inner}>
				<div className={classes.content}>
					<Title className={classes.title}>
						<div style={{width:'100%'}}>

							<span className={classes.highlight}>EXPLORE</span>
						</div>
						 UNIQUE <br/> RAREST <br/> COLLECTIONS
					</Title>
					{/* <Text c="dimmed" mt="md" hiddenFrom='sm_og'>
					Discover one-of-a-kind collections from passionate enthusiasts around the world. 
					View and rate thousands of rare finds spanning all categories imaginable. 
					Join a community of collectors obsessed with the unique, the rare, and the remarkable.
					</Text> */}

					
					
				</div>
				<div className="image-container">
					<Image src={heroImahe}
						fit="contain"className={classes.image} />

				</div>
			</div>
		</Container>
	);
}