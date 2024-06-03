import { notFound } from "next/navigation";

export const dynamicParams = true

export const generateStaticParams = async () => {
    // [{id: "1"}, {id: "2"}, ... ]
    const res = await fetch("http://localhost:4000/tickets")
    const tickets = await res.json();
    tickets.map((ticket) => {
        return {id: ticket.id}
    })
}

import { capitalizeString } from "@/utils/capitalizeString";

const getTicket = async (id) => {
    const res = await fetch(`http://localhost:4000/tickets/${id}`, {
        next: {
            revalidate: 60 
        }
    })
    if(!res.ok){
        notFound();
    }
    return res.json()
}

export default async function Ticket({ params }) {
    
    const id = params.id;    
    const singleTicket = await getTicket(id);

    return (
        <main>
            <nav>
                <h2>
                    Ticket Details
                </h2>
            </nav>
            <div className="card">
                <h3>
                    {singleTicket.title}
                </h3>
                <small>Created by {singleTicket.user_email}</small>
                <p>
                    {singleTicket.body}
                </p>
                <div className={`pill ${singleTicket.priority}`}>
                    {capitalizeString(singleTicket.priority)} priority
                </div>
            </div>
        </main>
    )
}

