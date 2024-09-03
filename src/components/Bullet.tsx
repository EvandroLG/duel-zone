type BulletProps = {
  top: number;
  left: number;
};

function Bullet({ top, left }: BulletProps) {
  return <div style={{ position: 'absolute', top, left }}>•</div>;
}

export default Bullet;
