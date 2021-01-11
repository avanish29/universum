import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { Event } from '@angular/router';
import { TranslateParser, TranslateService } from '@ngx-translate/core';


@Injectable()
export class PaginatorI18n extends MatPaginatorIntl {
    private rangeLabelIntl: string;

    constructor(private translateService: TranslateService, private translateParser: TranslateParser) { 
        super(); 
        this.translateService.onLangChange.subscribe((_event: Event) => {
            this.translateLabels();
        });
        this.translateLabels();
    }

    translateLabels(): void {
        this.firstPageLabel = this.translateService.instant("core.paginator.first.page.label");
        this.itemsPerPageLabel = this.translateService.instant("core.paginator.items.perpage.label");
        this.lastPageLabel = this.translateService.instant("core.paginator.last.page.label");
        this.nextPageLabel = this.translateService.instant("core.paginator.next.page.label");
        this.previousPageLabel = this.translateService.instant("core.paginator.previous.page.label");
        this.changes.next();
    }


    getRangeLabel = (page: number, pageSize: number, length: number) => {
        const of = this.translateService ? this.translateService.instant("core.paginator.of.label") : "of";
        if (length === 0 || pageSize === 0) {
            return "0 " + of + " " + length;
        }
        length = Math.max(length, 0);
        const startIndex = page * pageSize > length ? (Math.ceil(length / pageSize) - 1) * pageSize : page * pageSize;

        const endIndex = Math.min(startIndex + pageSize, length);
        return startIndex + 1 + " - " + endIndex + " " + of + " " + length;
    }
}
