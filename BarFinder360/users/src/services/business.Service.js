import { PrismaClient } from "@prisma/client";


class BusinessService {
  #client;
  constructor() {
    this.#client = new PrismaClient();
  }

    async createBusiness(body) {
        try {
        const results = await this.#client.business.create({
            data: {
            ...body,
            },
        
        });
        return { success: true, results };
        } catch (error) {
        return { success: false, error };
        }
    }
}

export default BusinessService;