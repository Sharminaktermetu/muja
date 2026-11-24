// import clientPromise from "@/lib/mongodb";
// import { PACKAGES, deliveryFee, SIZES } from "@/lib/pricing";

// export async function POST(req) {
//   try {
//     const body = await req.json();
//     const { name, phone, address, area, pkg, sizes } = body;

//     const p = PACKAGES[pkg];
//     if (!p) return Response.json({ error: "Invalid package" }, { status: 400 });
//     if (!name?.trim() || !address?.trim())
//       return Response.json({ error: "নাম ও ঠিকানা দিন" }, { status: 400 });
//     if (!/^01[3-9]\d{8}$/.test(phone || ""))
//       return Response.json({ error: "সঠিক মোবাইল নম্বর দিন" }, { status: 400 });
//     if (!["inside", "outside"].includes(area))
//       return Response.json({ error: "ডেলিভারি এলাকা বেছে নিন" }, { status: 400 });

//     const cleanSizes = (sizes || []).slice(0, p.pairs).map((s) => (SIZES.includes(s) ? s : ""));
//     const delivery = deliveryFee(p.pairs, area);

//     const order = {
//       name: name.trim(),
//       phone,
//       address: address.trim(),
//       area,
//       package: p.pairs,
//       sizes: cleanSizes,          // empty = confirm by phone
//       subtotal: p.price,
//       delivery,
//       total: p.price + delivery,  // computed on the server
//       payment: "COD",
//       status: "new",

//       createdAt: new Date(),
//     };

//     const client = await clientPromise;
//     const res = await client.db().collection("orders").insertOne(order);

//     return Response.json({ ok: true, id: res.insertedId, total: order.total });
//   } catch (e) {
//     console.error(e);
//     return Response.json({ error: "সার্ভার সমস্যা, আবার চেষ্টা করুন" }, { status: 500 });
//   }
// }