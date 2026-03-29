import Link from "next/link";
import { Button } from "./ds/ButtonComponent";
import { Card, CardContent, CardDescription, CardTitle, } from "./ds/CardComponent";
export default function HomeCard({ title, description, link }) {
    return (<Card>
      <Link href={link} className="flex">
        <CardContent>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
          <Button variant="outline">Try it</Button>
        </CardContent>
      </Link>
    </Card>);
}
