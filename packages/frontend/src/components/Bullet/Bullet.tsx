import './Bullet.css';

type BulletProps = {
  top: number;
  left: number;
};

function Bullet({ top, left }: BulletProps) {
  return <div className="bullet" style={{ position: 'absolute', top, left }} />;
}

export default Bullet;
